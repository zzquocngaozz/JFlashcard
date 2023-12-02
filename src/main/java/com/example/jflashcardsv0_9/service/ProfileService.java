package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProfileService {

    public List<UserDTO> findAllRequestRole();
    public UserDTO updateProfile(UserDTO userDTO, MyUserDetail myUserDetail) ;

    public boolean sendVerifyToken(String email);

    public void verifyUser(String token, String email);

    public boolean askTeacherRole(String email);
}
