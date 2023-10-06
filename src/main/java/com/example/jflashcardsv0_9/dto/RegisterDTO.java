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
public class RegisterDTO {
     String userName;
     String password;
     String email;
     String firstName;
     String lastName;
}
