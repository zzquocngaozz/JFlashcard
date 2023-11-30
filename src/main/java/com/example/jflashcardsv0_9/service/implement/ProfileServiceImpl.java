package com.example.jflashcardsv0_9.service.implement;


import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.entities.UserRequest;
import com.example.jflashcardsv0_9.exception.AppException;
import com.example.jflashcardsv0_9.exception.Error;
import com.example.jflashcardsv0_9.mapper.UserMapper;
import com.example.jflashcardsv0_9.repository.UserRepository;
import com.example.jflashcardsv0_9.repository.UserRequestRepository;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.ProfileService;
import com.example.jflashcardsv0_9.service.SendEmailService;
import com.example.jflashcardsv0_9.util.RandomTokenUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProfileServiceImpl implements ProfileService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRequestRepository userRequestRepository;

    @Autowired
    SendEmailService sendEmailService;

    @Override
    public List<UserDTO> findAllRequestRole() {
        List<User> users = userRequestRepository.findAllByRequestType(3).stream()
                .map(UserRequest::getUser).collect(Collectors.toList());
        List<UserDTO> userDTOs = users.stream()
                .map(UserMapper::toUserDTOResponse) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
        return userDTOs;
    }

    @Override
    public UserDTO updateProfile(UserDTO userDTO, MyUserDetail myUserDetail) {
        User user = userRepository.getUserByUserId(myUserDetail.getUser().getUserId().intValue());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setBirth(userDTO.getBirth());
        User updatedUser = userRepository.save(user);
        return UserMapper.toUserDTOResponse(updatedUser);
    }

    @Override
    public boolean sendVerifyToken(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty())
            throw new AppException(Error.USER_NOT_FOUND);
        Optional<UserRequest> optionalUR = userRequestRepository.findByRequestTypeAndUserEmail(2, email);
        if (optionalUR.isPresent()) {
            userRequestRepository.delete(optionalUR.get());// clear neu ton tai otp truoc do
        }
        String token = RandomTokenUtil.generateToken();
        // get token
        userRequestRepository.save(UserRequest.builder()
                .requestType(2)
                .token(token)
                .createAt(new Date(System.currentTimeMillis()))
                .expireAt(new Date(System.currentTimeMillis() + 15 * 60 * 1000))// 15 phut
                .build());
        sendEmailService.sendVerifyToken(email, token);//send token
        //
        return true;
    }

    @Override
    public void verifyUser(String token, String email) {
        Optional<UserRequest> optionalUserRequest = userRequestRepository.findByTokenAndUserEmail(token, email);
        if (optionalUserRequest.isEmpty())
            throw new AppException(Error.VERIFY_FALSE);

        UserRequest userRequest = optionalUserRequest.get();
        if (RandomTokenUtil.checkExpire(userRequest.getExpireAt()))
            throw new AppException(Error.TOKEN_EXPIRE);
        userRequestRepository.delete(userRequest);// clearn token after verify
    }

    @Override
    public boolean askTeacherRole(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty())
            throw new AppException(Error.USER_NOT_FOUND);
        // xem da co request truoc do chua
        Optional<UserRequest> optionalUR = userRequestRepository.findByRequestTypeAndUserEmail(3, email);
        if (optionalUR.isPresent()) {
            throw new AppException(Error.USER_NOT_FOUND);// clear neu ton tai otp truoc do
        }
        // luu request user
        userRequestRepository.save(UserRequest.builder()
                .requestType(3)
                .token("")
                .createAt(new Date(System.currentTimeMillis()))
                .expireAt(null)// 15 phut
                .user(optionalUser.get())
                .build());
        return false;
    }
}
