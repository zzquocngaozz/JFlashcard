package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.ProfileService;
import com.example.jflashcardsv0_9.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
public class AppController {

    @Autowired
    private UserService userService;
    @Autowired
    ProfileService profileService;

    @GetMapping
    public HomeDTO homePageOfGuest(){
        return userService.homePageOfGuest();
    }

    @PostMapping("/login")
    public LoginDTOResponse login(@RequestBody LoginDTORequest loginDTORequest) {
        return userService.login(loginDTORequest);
    }
    @PostMapping("/verify")
    public ResponseEntity<?> getVerifyToken(@RequestBody TokenDTO tokenDTO) {
        profileService.sendVerifyToken(tokenDTO.getEmail());
        return ResponseEntity.ok("Đã gửi mail");
    }
    @PutMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody TokenDTO tokenDTO) {
        profileService.verifyUser(tokenDTO.getToken(),tokenDTO.getEmail());
        return ResponseEntity.ok("Token đúng");
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
    @PostMapping("/forgot")
    public ResponseEntity<?> getOTP(@RequestBody TokenDTO tokenDTO){
        userService.sendOTP(tokenDTO.getEmail());
        return ResponseEntity.ok("ok");
    }

    @PutMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody TokenDTO tokenDTO){
        userService.forgotPassword(tokenDTO);
        return ResponseEntity.ok("ok");
    }

}
