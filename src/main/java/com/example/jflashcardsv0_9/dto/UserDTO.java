package com.example.jflashcardsv0_9.dto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDTO {
    long userId;
    String userName;
    @JsonIgnore
    String password;
    String email;
    String firstName;
    String lastName;
    Date birth;
    int role;
    boolean isLooked;
    boolean isVerify;

}
