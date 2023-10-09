package com.example.jflashcardsv0_9.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum Error {
    DUPLICATED_USER("Trùng thông tin người dùng", HttpStatus.UNPROCESSABLE_ENTITY),
    EMAIL_USER_NULL("Email người dùng không thể để trống", HttpStatus.UNPROCESSABLE_ENTITY),
    USERNAME_USER_NULL("Username người dùng không thể để trống", HttpStatus.UNPROCESSABLE_ENTITY),
    EMAIL_USER_EXIST("Email đã tồn tại", HttpStatus.UNPROCESSABLE_ENTITY),
    USERNAME_USER_EXIST("User name đã tồn tại", HttpStatus.UNPROCESSABLE_ENTITY),
    LOGIN_INFO_INVALID("Thông tin đăng nhập không hợp lệ", HttpStatus.UNPROCESSABLE_ENTITY),
    USER_BLOCK("Người dùng bị chặn", HttpStatus.UNPROCESSABLE_ENTITY),

    USER_NOT_FOUND("Không tìm thấy người dùng", HttpStatus.NOT_FOUND),
    TOKEN_NOT_FOUND("Không tìm thấy mã thông báo", HttpStatus.NOT_FOUND),
    COMMENT_NOT_FOUND("Không tìm thấy bình luận", HttpStatus.NOT_FOUND),
    ;

    private final String message;
    private final HttpStatus status;

    Error(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }
}

