package com.example.jflashcardsv0_9.mapper;

import com.example.jflashcardsv0_9.dto.RegisterDTO;
import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.model.TokenPayload;
public class UserMapper {
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
        return UserDTO.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .password(user.getPassword())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRoles().toString())
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
