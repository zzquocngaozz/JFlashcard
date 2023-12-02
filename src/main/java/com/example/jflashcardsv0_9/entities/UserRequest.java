package com.example.jflashcardsv0_9.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "userRequest")

public class UserRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int requestType;//1: OTP  quen mk, 2: verify email, 3: change role
    private String token;
    private Date createAt;
    private Date expireAt;// default 15 phu
    private String mail;
    @ManyToOne
    @JoinColumn( name = "user_id")
    private User user;
}

