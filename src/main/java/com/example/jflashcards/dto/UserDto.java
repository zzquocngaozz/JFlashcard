package com.example.jflashcards.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
//import jakarta.persistence.*;
import javax.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class UserDto {
    private Long userId;
    private String userName;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private int gender;
    private Date birth;
}
