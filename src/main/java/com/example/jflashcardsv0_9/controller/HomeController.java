package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.HomePageDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.HomePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/homepage")
public class HomeController {
    @Autowired
    private HomePageService homePageService;
    @GetMapping
    public HomePageDTO homePage(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return homePageService.homePage(myUserDetail.getUser());
    }
}
