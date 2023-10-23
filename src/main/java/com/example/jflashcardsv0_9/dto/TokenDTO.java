package com.example.jflashcardsv0_9.dto;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString
public class TokenDTO {
    String token;
    String newPassword;
    String cfPassword;
    String password;
    String email;
}
