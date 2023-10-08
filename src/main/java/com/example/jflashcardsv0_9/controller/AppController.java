package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.LoginDTORequest;
import com.example.jflashcardsv0_9.dto.LoginDTOResponse;
import com.example.jflashcardsv0_9.dto.RegisterDTO;
import com.example.jflashcardsv0_9.dto.UserDTO;

import com.example.jflashcardsv0_9.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
public class AppController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public LoginDTOResponse login(@RequestBody LoginDTORequest loginDTORequest) {
        return userService.login(loginDTORequest);
    }
    @PostMapping("/register")
    public UserDTO registration(@RequestBody RegisterDTO registerDTO)  {
        return userService.registration(registerDTO);
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        // Xóa authentication và token
        SecurityContextHolder.clearContext();
        // Xóa token (nếu cần)
        // response.setHeader("Authorization", ""); // Đặt giá trị Authorization header thành chuỗi rỗng
        return ResponseEntity.ok("Logged out successfully");
    }
    // Hàm chuyển đổi UserDTO thành User


}
