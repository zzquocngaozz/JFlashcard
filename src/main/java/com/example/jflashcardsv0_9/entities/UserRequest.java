package com.example.jflashcardsv0_9.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int requestType;//1: OTP  quen mk, 2: verify email, 3: change role
    private String token;
    private Date createAt;
    private Date expireAt;

    @ManyToOne
    @JoinColumn( name = "user_id")
    private User user;
}

