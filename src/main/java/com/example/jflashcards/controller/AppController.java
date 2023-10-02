package com.example.jflashcards.controller;
import com.example.jflashcards.entities.Role;
import com.example.jflashcards.entities.User;
import com.example.jflashcards.repository.UserRepository;
import com.example.jflashcards.security.MyUserDetail;
import com.example.jflashcards.service.RoleService;
import com.example.jflashcards.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
public class AppController {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

//    @GetMapping
//    public User viewHome() {
//        User user = userDetail.getUser();
//        return user;
//    }

//    @PostMapping("/register")
//    public User register(@RequestBody User user) {
//        // Thêm vai trò "learner" mặc định cho người dùng mới đăng ký
//        Role learnerRole = roleService.findRoleByName("ROLE_LEARNER");
//        user.getRoleList().add(learnerRole);
//
//        return userService.registerUser(user);
//    }
//
//    @PostMapping("/login")
//    public User login(@RequestParam String username, @RequestParam String password) {
//        return userService.loginUser(username, password);
//    }

//    @PostMapping("/addRole")
//    public User addRole(@RequestParam Long userId, @RequestParam String roleName) {
//        User user = userRepository.findById(userId).orElse(null);
//        Role role = roleService.findRoleByName(roleName);
//        if (user != null && role != null) {
//            user.getRoles().add(role);
//            return userRepository.save(user);
//        }
//        return null;
//    }

}
