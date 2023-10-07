package com.example.jflashcardsv0_9.dto;

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
