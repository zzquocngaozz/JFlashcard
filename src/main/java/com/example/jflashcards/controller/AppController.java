package com.example.jflashcards.controller;

import com.example.jflashcards.dto.LoginDTO;
import com.example.jflashcards.dto.UserDTO;
import com.example.jflashcards.entities.Role;
import com.example.jflashcards.entities.User;
import com.example.jflashcards.service.RoleService;
import com.example.jflashcards.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
public class AppController {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager; // Đảm bảo bạn đã inject AuthenticationManager

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginDTO loginDTO) {
        // Kiểm tra thông tin đăng nhập
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
        );

        // Đăng nhập thành công, tạo token và lưu trữ trong SecurityContextHolder
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Trả về thông tin người dùng sau khi đăng nhập
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.getUserByEmail(userDetails.getUsername());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO) throws ParseException {
        User existingUser = userService.getUserByEmail(userDTO.getEmail());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("User with this email already exists!");
        }

        // Chuyển đổi UserDTO thành User và lưu vào cơ sở dữ liệu
        User user = convertUserDTOToUser(userDTO);
        userService.createUserWithRoles(user,"ROLE_LEARNER");
        return ResponseEntity.ok("User registered successfully!");
    }

    // Hàm chuyển đổi UserDTO thành User
    private User convertUserDTOToUser(UserDTO userDTO) throws ParseException {
        User user = new User();
        user.setUserName(userDTO.getUserName());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhone(userDTO.getPhone());
        user.setGender(userDTO.getGender());
        // Lấy đối tượng Date từ userDTO
        Date birthDate = userDTO.getBirth();
// Định dạng cho đối tượng SimpleDateFormat
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
// Chuyển đối tượng Date thành chuỗi String
        String birthDateString = dateFormat.format(birthDate);
        // Đặt giá trị cho user
        user.setBirth(birthDateString);
        // Set các giá trị khác của User tùy theo cần thiết
        return user;
    }

}
