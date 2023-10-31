package com.example.jflashcardsv0_9.exception;

import com.example.jflashcardsv0_9.dto.RegisterDTO;
import com.example.jflashcardsv0_9.repository.UserRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Validate {
    UserRepository userRepository;

    @Autowired
    public Validate(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    boolean isValidEmail(String email) {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        String emailRegex = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
        return email.matches(emailRegex);
    }
    boolean isPassword(String password) {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        String passRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";
        return password.matches(passRegex);
    }
    boolean isUsername(String userName) {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        String userRegex = "^[a-zA-Z0-9]+$";
        return userName.matches(userRegex);
    }
    boolean isFirstname(String firstName) {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        String firstNameRegex = "^[^\\s!@#$%^&*()_+{}\\[\\]:;<>,.?~\\|\\/\\-][^!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\\\|\\/\\-]*[^\\s!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\\\|\\/\\-]$";
        return firstNameRegex.matches(firstNameRegex);
    }
    boolean isLastname(String lastName) {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        String lastNameRegex = "^[^\\s!@#$%^&*()_+{}\\[\\]:;<>,.?~\\|\\/\\-][^!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\\\|\\/\\-]*[^\\s!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\\\|\\/\\-]$";
        return lastName.matches(lastNameRegex);
    }
    public void CheckRegisterDTO(RegisterDTO registerDTO) {
        if (registerDTO.getUserName() == "" || !isUsername(registerDTO.getUserName())) {
            throw new AppException(Error.USERNAME_USER_NULL);
        }
        if(registerDTO.getEmail() == "" || !isValidEmail(registerDTO.getEmail())){
            throw new AppException(Error.EMAIL_USER_NULL);
        }
        if(registerDTO.getPassword() == "" || !isPassword(registerDTO.getPassword())){
            throw new AppException(Error.EMAIL_USER_NULL);
        }
        if(userRepository.existsByUserName(registerDTO.getUserName())){
            throw new AppException(Error.USERNAME_USER_EXIST);
        }
        if(userRepository.existsByEmail(registerDTO.getEmail())){
            throw new AppException(Error.EMAIL_USER_EXIST);
        }
    }
}
