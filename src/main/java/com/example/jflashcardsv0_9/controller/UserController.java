package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.repository.UserRepository;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/homepage")
public class UserController {
    @Autowired
    private UserService userService;



//    @PostMapping("/saveUser")
//    public String saveUser(@ModelAttribute(name = "user") User user, HttpServletRequest request) throws UnsupportedEncodingException {
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        String encodedPassword = encoder.encode(user.getPassword());
//        user.setPassword(encodedPassword);
//        Role roleUser = roleRepository.findByName("ROLE_USER");
//        user.addRole(roleUser);
//        return userService.saveUser(user);
//
//    }

}
