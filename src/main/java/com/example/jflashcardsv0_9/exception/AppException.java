package com.example.jflashcardsv0_9.exception;

import lombok.Getter;

@Getter
public class AppException extends RuntimeException {
    private final Error error;
    public AppException(Error error) {
        super(error.getMessage());
        this.error = error;
    }
}
