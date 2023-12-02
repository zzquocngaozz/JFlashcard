package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Set;

@Service
public interface UserService {

    List<UserDTO> findAllUser() ;

    UserDTO registration(RegisterDTO registerDTO);
    UserDTO registrationADMIN(RegisterDTO registerDTO);

    LoginDTOResponse login(LoginDTORequest loginDTORequest);

    UserDTO getUserByUserId(int userid);

    void blockUser(Long userId);
    void unblockUser(Long userId);
    void changeUserRole(Long userId, int newRoles);
    void addUser(UserDTO userDTO);

    void changePassword(TokenDTO tokenDTO, MyUserDetail myUserDetail);


    void forgotPassword(TokenDTO tokenDTO);

    public boolean sendOTP(String email);

    HomeDTO homePageOfGuest();
}
