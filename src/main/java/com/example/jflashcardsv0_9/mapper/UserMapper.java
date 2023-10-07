package com.example.jflashcardsv0_9.mapper;

import com.example.jflashcardsv0_9.dto.RegisterDTO;
import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.entities.Role;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.dto.TokenPayload;
import com.example.jflashcardsv0_9.repository.RoleRepository;
import com.example.jflashcardsv0_9.service.RoleService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class UserMapper {
    static RoleService roleService;
    @Autowired
    public UserMapper(RoleService roleService) {
        this.roleService = roleService;
    }

    public static User toUser(RegisterDTO registerDTO) {
        return User.builder()
                .userName(registerDTO.getUserName())
                .email(registerDTO.getEmail())
                .password(registerDTO.getPassword())
                .firstName(registerDTO.getFirstName())
                .lastName(registerDTO.getLastName())
                .build();
    }

    public static UserDTO toUserDTOResponse(User user) {
        Set<Role> roles = user.getRoles();
        List<String> roleNames = new ArrayList<>();

        if (roles != null) {
            for (Role role : roles) {
                roleNames.add(role.getName());
            }
        }

        Integer roleId = null;
        if (!roleNames.isEmpty()) {
            // Lấy tên của vai trò đầu tiên trong danh sách
            String roleName = roleNames.get(0);
            roleId = roleService.getRoleIdByRoleName(roleName);
        }
        return UserDTO.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .password(user.getPassword())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .birth(user.getBirth())
                .role(roleId)
                .isLooked(user.isLooked())
                .isVerify(user.isVerify())
                .build();
    }

    public static TokenPayload toTokenPayload(User user) {
        return TokenPayload.builder()
                .userId(user.getUserId())
                .username(user.getUserName())
                .build();
    }
}
