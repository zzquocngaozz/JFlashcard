package com.example.jflashcardsv0_9.service;
import com.example.jflashcardsv0_9.dto.LoginDTORequest;
import com.example.jflashcardsv0_9.dto.LoginDTOResponse;
import com.example.jflashcardsv0_9.dto.RegisterDTO;
import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {
    Integer getRoleIdByRoleName(String roleName);
}
