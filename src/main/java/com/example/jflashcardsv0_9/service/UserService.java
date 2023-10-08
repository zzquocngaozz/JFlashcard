package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.LoginDTORequest;
import com.example.jflashcardsv0_9.dto.LoginDTOResponse;
import com.example.jflashcardsv0_9.dto.RegisterDTO;
import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.entities.Role;
import com.example.jflashcardsv0_9.entities.User;
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
    void addUser(UserDTO userDTO) ;
}
