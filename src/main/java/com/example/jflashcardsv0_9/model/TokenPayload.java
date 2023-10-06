package com.example.jflashcardsv0_9.model;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TokenPayload {
    private long userId;
    private String username;
    private String password;
}
