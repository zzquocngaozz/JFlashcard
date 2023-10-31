package com.example.jflashcardsv0_9.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum Error {
    DUPLICATED_USER("Trùng thông tin người dùng", HttpStatus.UNPROCESSABLE_ENTITY),
    EMAIL_USER_NULL("Email người dùng không thể để trống", HttpStatus.UNPROCESSABLE_ENTITY),
    PASS_USER_NULL("Pass người dùng không thể để trống", HttpStatus.UNPROCESSABLE_ENTITY),
    USERNAME_USER_NULL("Username người dùng không thể để trống ", HttpStatus.UNPROCESSABLE_ENTITY),
    NAME_USER_NULL("Tên người dùng không thể để trống ", HttpStatus.UNPROCESSABLE_ENTITY),
    DESCRIPTION_USER_NULL("Mô tả không thể để trống ", HttpStatus.UNPROCESSABLE_ENTITY),
    TITLE_USER_NULL("Tiêu đề  không thể để trống ", HttpStatus.UNPROCESSABLE_ENTITY),
    EMAIL_USER_EXIST("Email đã tồn tại", HttpStatus.UNPROCESSABLE_ENTITY),
    USERNAME_USER_EXIST("User name đã tồn tại", HttpStatus.UNPROCESSABLE_ENTITY),
    LOGIN_INFO_INVALID("Thông tin đăng nhập không hợp lệ", HttpStatus.UNPROCESSABLE_ENTITY),
    USER_BLOCK("Người dùng bị chặn", HttpStatus.UNPROCESSABLE_ENTITY),
    PASSWORD_FALSE("Mật khẩu không đúng ", HttpStatus.UNPROCESSABLE_ENTITY),
    VERIFY_FALSE("Mã xác nhận không đúng ", HttpStatus.UNPROCESSABLE_ENTITY),
    EMAIL_ERROR_MESSAGE ("Email không hợp lệ", HttpStatus.UNPROCESSABLE_ENTITY),
    PASSWORD_ERROR_MESSAGE ("Mật khẩu phải có từ 8 ký tự chỉ bao gồm chữ hoa, chữ thường và chữ số",HttpStatus.UNPROCESSABLE_ENTITY),
    NAME_ERROR_MESSAGE ("Tên không được chứa những ký tự đặc biệt và ký tự trắng thừa ", HttpStatus.UNPROCESSABLE_ENTITY),
    TITLE_ERROR_MESSAGE("Tiêu đề không chứa dấu cách ở đầu ", HttpStatus.UNPROCESSABLE_ENTITY),
    DESCRIPTION_ERROR_MESSAGE ("Mô tả không chứa dấu xuống dòng", HttpStatus.UNPROCESSABLE_ENTITY),
    USERNAME_ERROR_MESSAGE ("Tên tài khoản chỉ chứa chữ và số",HttpStatus.UNPROCESSABLE_ENTITY),
    USERNAME_MIN_LENGTH ("Tên ít nhất có 4 ký tự",HttpStatus.UNPROCESSABLE_ENTITY),
    NAME_MIN_LENGTH ("Tên ít nhất có 2 ký tự",HttpStatus.UNPROCESSABLE_ENTITY),
    USERNAME_MAX_LENGTH ("Tên dài nhất có 30 ký tự",HttpStatus.UNPROCESSABLE_ENTITY),
    TITLE_MAX_LENGTH("Bạn không nên để tiêu đề quá dài! Tối đa 50 ký tự",HttpStatus.UNPROCESSABLE_ENTITY),
    TITLE_MIN_LENGTH("Bạn không nên để tiêu đề quá dài! Tối đa 50 ký tự",HttpStatus.UNPROCESSABLE_ENTITY),
    DESCRIPTION_MAX_LENGTH("Bạn không nên để mô tả quá dài! Tối đa 255 ký tự",HttpStatus.UNPROCESSABLE_ENTITY),
    TERM_NULL("Thuật ngữ  không thể để trống", HttpStatus.UNPROCESSABLE_ENTITY),
    TERM_ERROR_MESSAGE ("Thuật ngữ không chứa dấu cách ở đầu",HttpStatus.UNPROCESSABLE_ENTITY),
    TERM_MAX_LENGTH("Thuật ngữ không được quá 50 ký tự",HttpStatus.UNPROCESSABLE_ENTITY),
    MEAN_USER_NULL("Ý nghĩa  không thể để trống", HttpStatus.UNPROCESSABLE_ENTITY),
    MEAN_ERROR_MESSAGE ("Ý nghĩa không chứa dấu cách ở đầu",HttpStatus.UNPROCESSABLE_ENTITY),
    MEAN_MAX_LENGTH("Ý nghĩa không được quá 50 ký tự",HttpStatus.UNPROCESSABLE_ENTITY),

    AUTH_GI_DO("Bạn không có quyền",HttpStatus.UNAUTHORIZED),
    SET_NOT_FOUND("Không tìm bộ thẻ dùng", HttpStatus.NOT_FOUND),
    CARD_NOT_FOUND("Không tìm card trong bộ thẻ ", HttpStatus.NOT_FOUND),

    USER_NOT_FOUND("Không tìm thấy người dùng", HttpStatus.NOT_FOUND),
    TOKEN_NOT_FOUND("Không tìm thấy mã thông báo", HttpStatus.NOT_FOUND),
    COMMENT_NOT_FOUND("Không tìm thấy bình luận", HttpStatus.NOT_FOUND),
    CLASSROOM_NOT_FOUND("Không tìm thấy lớp học", HttpStatus.NOT_FOUND),
    TOKEN_EXPIRE("Mã xác nhận đã hết hạn", HttpStatus.NOT_FOUND),
    ;

    private final String message;
    private final HttpStatus status;

    Error(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }
}

