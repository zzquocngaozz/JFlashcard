package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {
    @Autowired
    private UserService userService;

}
