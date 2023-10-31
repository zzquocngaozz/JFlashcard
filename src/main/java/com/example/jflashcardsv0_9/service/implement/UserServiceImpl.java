package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.Role;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.entities.UserRequest;
import com.example.jflashcardsv0_9.exception.Error;
import com.example.jflashcardsv0_9.exception.Validate;
import com.example.jflashcardsv0_9.mapper.UserMapper;
import com.example.jflashcardsv0_9.repository.RoleRepository;
import com.example.jflashcardsv0_9.repository.UserRepository;
import com.example.jflashcardsv0_9.repository.UserRequestRepository;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.SendEmailService;
import com.example.jflashcardsv0_9.service.UserService;
import com.example.jflashcardsv0_9.util.JwtTokenUtil;
import com.example.jflashcardsv0_9.exception.*;

import com.example.jflashcardsv0_9.util.RandomTokenUtil;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static com.example.jflashcardsv0_9.exception.Validate.*;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    BCryptPasswordEncoder passwordEncoder;
    JwtTokenUtil jwtTokenUtil;
    RoleRepository roleRepository;
    UserRequestRepository userRequestRepository;
    SendEmailService sendEmailService;
    Validate validate;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil, RoleRepository roleRepository, UserRequestRepository userRequestRepository, SendEmailService sendEmailService,Validate validate) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
        this.roleRepository = roleRepository;
        this.userRequestRepository = userRequestRepository;
        this.sendEmailService = sendEmailService;
        this.validate = validate;
    }

    @Override
    public UserDTO registration( RegisterDTO registerDTO) {
        validate.CheckRegisterDTO(registerDTO);
        registerDTO.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        User user = UserMapper.toUser(registerDTO);
        Role roles = roleRepository.findByName("ROLE_LEARNER").get();
        user.setRoles(Collections.singleton(roles));
        userRepository.save(user);
        return UserMapper.toUserDTOResponse(user);
    }
    private void CheckUserDTO(UserDTO userDTO) {
        if (userDTO.getUserName() == null) {
            throw new AppException(Error.USERNAME_USER_NULL);
        }
        if(userDTO.getEmail() == null){
            throw new AppException(Error.EMAIL_USER_NULL);
        }
        if(userRepository.existsByUserName(userDTO.getUserName())){
            throw new AppException(Error.USERNAME_USER_EXIST);
        }
        if(userRepository.existsByEmail(userDTO.getEmail())){
            throw new AppException(Error.EMAIL_USER_EXIST);
        }

    }

    @Override
    public UserDTO registrationADMIN( RegisterDTO registerDTO) {
        validate.CheckRegisterDTO(registerDTO);
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
        System.out.println(roles.getName());
        Set<Role> rs = new HashSet<>();
        rs.add(roles);
        user.setRoles(rs);
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

    @Override
    public void changePassword(TokenDTO tokenDTO, MyUserDetail myUserDetail) {
        User user = userRepository.getUserByUserId(myUserDetail.getUser().getUserId());
        boolean isCorrectPass = passwordEncoder.matches(tokenDTO.getPassword(),user.getPassword());
        System.out.println("Print here 185 change pass" +tokenDTO.getPassword()+" "+tokenDTO.getNewPassword());
        if(!isCorrectPass) throw new AppException(Error.PASSWORD_FALSE);
        user.setPassword(passwordEncoder.encode(tokenDTO.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public void forgotPassword(TokenDTO tokenDTO) {
        Optional<UserRequest> optionalUserRequest = userRequestRepository.findByToken(tokenDTO.getToken());

        if (optionalUserRequest.isEmpty())
            throw new AppException(Error.VERIFY_FALSE);

        UserRequest userRequest = optionalUserRequest.get();
        if (RandomTokenUtil.checkExpire(userRequest.getExpireAt()))
            throw new AppException(Error.TOKEN_EXPIRE);
        userRequestRepository.delete(userRequest);// clearn token after verify
        User verifyUser = userRequest.getUser();
        System.out.println(tokenDTO.toString());
        verifyUser.setPassword(passwordEncoder.encode(tokenDTO.getNewPassword()));
        User updatedUser = userRepository.save(verifyUser);
        System.out.print(verifyUser.toString());
    }

    @Override
    public boolean sendOTP(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty())
            throw new AppException(Error.USER_NOT_FOUND);
        Optional<UserRequest> optionalUR = userRequestRepository.findByRequestTypeAndUserEmail(1, email);
        if (optionalUR.isPresent()) {
            userRequestRepository.delete(optionalUR.get());// clear neu ton tai otp truoc do
        }
        String token = RandomTokenUtil.generateToken();
        // get token
        userRequestRepository.save(UserRequest.builder()
                .requestType(1)
                .token(token)
                .createAt(new Date(System.currentTimeMillis()))
                .expireAt(new Date(System.currentTimeMillis() + 15 * 60 * 1000))// 15 phut
                .user(optionalUser.get())
                .build());
        sendEmailService.sendOTPToken(email, token);//send token
        //
        return true;
    }
}
