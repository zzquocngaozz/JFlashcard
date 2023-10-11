package com.example.jflashcardsv0_9.dto;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TokenDTO {
    String token;
    String newPassword;
    String cfPassword;
    String password;
    String email;
}
