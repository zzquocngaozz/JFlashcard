package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.RegisterDTO;
import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.dto.LoginDTORequest;
import com.example.jflashcardsv0_9.dto.LoginDTOResponse;
import com.example.jflashcardsv0_9.entities.Role;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.exception.Error;
import com.example.jflashcardsv0_9.mapper.UserMapper;
import com.example.jflashcardsv0_9.repository.RoleRepository;
import com.example.jflashcardsv0_9.repository.UserRepository;
import com.example.jflashcardsv0_9.service.UserService;
import com.example.jflashcardsv0_9.util.JwtTokenUtil;
import com.example.jflashcardsv0_9.exception.*;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public UserDTO registration( RegisterDTO registerDTO) {
        CheckRegisterDTO(registerDTO);
        registerDTO.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        User user = UserMapper.toUser(registerDTO);
        Role roles = roleRepository.findByName("ROLE_LEARNER").get();
        user.setRoles(Collections.singleton(roles));
        userRepository.save(user);
        return UserMapper.toUserDTOResponse(user);
    }

    private void CheckRegisterDTO(RegisterDTO registerDTO) {
        if (registerDTO.getUserName() == null) {
            throw new AppException(Error.DUPLICATED_USER);
        }
        if(registerDTO.getEmail() == null){
            throw new AppException(Error.DUPLICATED_USER);
        }
        if(userRepository.existsByUserName(registerDTO.getUserName())){
            throw new AppException(Error.DUPLICATED_USER);
        }
        if(userRepository.existsByEmail(registerDTO.getEmail())){
            throw new AppException(Error.DUPLICATED_USER);
        }

    }
    private void CheckUserDTO(UserDTO userDTO) {
        if (userDTO.getUserName() == null) {
            throw new AppException(Error.DUPLICATED_USER);
        }
        if(userDTO.getEmail() == null){
            throw new AppException(Error.DUPLICATED_USER);
        }
        if(userRepository.existsByUserName(userDTO.getUserName())){
            throw new AppException(Error.DUPLICATED_USER);
        }
        if(userRepository.existsByEmail(userDTO.getEmail())){
            throw new AppException(Error.DUPLICATED_USER);
        }

    }

    @Override
    public UserDTO registrationADMIN( RegisterDTO registerDTO) {
        CheckRegisterDTO(registerDTO);
        registerDTO.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        User user = UserMapper.toUser(registerDTO);
        Role roles = roleRepository.findByName("ROLE_ADMIN").get();
        user.setRoles(Collections.singleton(roles));
        userRepository.save(user);
        return UserMapper.toUserDTOResponse(user);
    }

    @Override
    public LoginDTOResponse login(LoginDTORequest loginDTORequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginDTORequest.getEmail());
        boolean isAuthentication = false;
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginDTORequest.getPassword(), user.getPassword())) {
                isAuthentication = true;
            }
        }
        if (!isAuthentication) {
            throw new AppException(Error.LOGIN_INFO_INVALID);
        }
        User user = userOptional.get();
        if(user.isLooked() == true){
            throw new AppException(Error.USER_BLOCK);
        }
        final int ONE_DAY_MILLISECONDS = 24 * 60 * 60;
        String accessToken = "Bearer " + jwtTokenUtil.generateToken(UserMapper.toTokenPayload(user), ONE_DAY_MILLISECONDS);
        return LoginDTOResponse.builder()
                .user(UserMapper.toUserDTOResponse(user))
                .accessToken(accessToken)
                .build();
//        return LoginDTOResponse.builder()
//                .account(AccountMapper.toAccountDTOResponse(account))
//                .build();
    }
    @Override
    public List<UserDTO> findAllUser(){

        List<User> users = userRepository.findAll();

        List<UserDTO> userDTOs = users.stream()
                .map(UserMapper::toUserDTOResponse) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
        return userDTOs;
    }
    @Override
    public UserDTO getUserByUserId (int userid){
        return UserMapper.toUserDTOResponse(userRepository.getUserByUserId(userid));
    }
    @Override
    public void blockUser(Long userId) {
        Optional<User> userOptional = userRepository.findByUserId(userId);
        if (!userOptional.isPresent()) {
            // Xử lý trường hợp không tìm thấy người dùng
            throw new AppException(Error.USER_NOT_FOUND);
        }
        User user = userOptional.get();
        user.setLooked(true); // Đánh dấu người dùng là bị chặn
        userRepository.save(user);
    }
    @Override
    public void unblockUser(Long userId) {
        Optional<User> userOptional = userRepository.findByUserId(userId);
        if (!userOptional.isPresent()) {
            // Xử lý trường hợp không tìm thấy người dùng
            throw new AppException(Error.USER_NOT_FOUND);
        }
        User user = userOptional.get();
        user.setLooked(false); // Đánh dấu người dùng là bị chặn
        userRepository.save(user);
    }
    @Override
    public void changeUserRole(Long userId,int role) {
        Optional<User> userOptional = userRepository.findByUserId(userId);
        if (!userOptional.isPresent()) {
            // Xử lý trường hợp không tìm thấy người dùng
            throw new AppException(Error.USER_NOT_FOUND);
        }
        User user = userOptional.get();
        Role roles = roleRepository.findByRoleId(role).get();
        user.setRoles(Collections.singleton(roles));
        userRepository.save(user);
    }
    @Override
    public void addUser(UserDTO userDTO) {
        CheckUserDTO(userDTO);
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User user = UserMapper.toUserDTO(userDTO);
        Role roles = roleRepository.findRoleByRoleId(userDTO.getRole());
        user.setRoles(Collections.singleton(roles));
        userRepository.save(user);
    }
}
