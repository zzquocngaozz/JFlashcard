package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.HomePageDTO;
import com.example.jflashcardsv0_9.dto.SetSingleDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
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
    @Autowired
    private FlashcardSetService flashcardSetService;
    // chưa xong han
    @GetMapping
    public HomePageDTO homePage(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return homePageService.homePage(myUserDetail.getUser());
    }
    @GetMapping("/listset")
    public List<SetSingleDTO> listSetOfUser(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return flashcardSetService.listSetOfUser(myUserDetail.getUser());
    }
}
