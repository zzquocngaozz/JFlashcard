package com.example.jflashcards.controller;

import com.example.jflashcards.entities.User;
import com.example.jflashcards.repository.UserRepository;
import com.example.jflashcards.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUser(){
        return userService.findAllUser();
    }

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
