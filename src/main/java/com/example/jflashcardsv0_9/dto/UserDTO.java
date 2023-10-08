package com.example.jflashcardsv0_9.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Date;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    long userId;
    String userName;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)    String password;
    String email;
    String firstName;
    String lastName;
    Date birth;
    int role;
    boolean isLooked;
    boolean isVerify;

}
