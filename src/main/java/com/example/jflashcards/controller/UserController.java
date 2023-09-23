package com.example.jflashcards.controller;

import com.example.jflashcards.entities.User;
import com.example.jflashcards.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUser(){
        return userRepository.findAll();
    }

}
