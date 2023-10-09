package com.example.jflashcardsv0_9.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum Error {
    DUPLICATED_USER("trùng thông tin người dùng", HttpStatus.UNPROCESSABLE_ENTITY),
    EMAIL_USER_NULL("email người dùng không thể để trống", HttpStatus.UNPROCESSABLE_ENTITY),
    USERNAME_USER_NULL("username người dùng không thể để trống", HttpStatus.UNPROCESSABLE_ENTITY),
    EMAIL_USER_EXIST("email đã tồn tại", HttpStatus.UNPROCESSABLE_ENTITY),
    USERNAME_USER_EXIST("user name đã tồn tại", HttpStatus.UNPROCESSABLE_ENTITY),
    LOGIN_INFO_INVALID("thông tin đăng nhập không hợp lệ", HttpStatus.UNPROCESSABLE_ENTITY),
    USER_BLOCK("người dùng bị chặn", HttpStatus.UNPROCESSABLE_ENTITY),

    USER_NOT_FOUND("không tìm thấy người dùng", HttpStatus.NOT_FOUND),
    TOKEN_NOT_FOUND("không tìm thấy mã thông báo", HttpStatus.NOT_FOUND),
    COMMENT_NOT_FOUND("không tìm thấy bình luận", HttpStatus.NOT_FOUND),
    ;

    private final String message;
    private final HttpStatus status;

    Error(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }
}

