package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.CardBankDTO;
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
    private final HomePageService homePageService;

    private final FlashcardSetService flashcardSetService;
    @Autowired
    public HomeController(HomePageService homePageService, FlashcardSetService flashcardSetService) {
        this.homePageService = homePageService;
        this.flashcardSetService = flashcardSetService;
    }

    @GetMapping
    public HomePageDTO homePage(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return homePageService.homePage(myUserDetail.getUser());
    }
    @GetMapping("/listset")
    public List<SetSingleDTO> listManagerSetOfUser(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return flashcardSetService.listManagerSetOfUser(myUserDetail.getUser());
    }
    @GetMapping("/listhistoryset")
    public List<SetSingleDTO> listHistorySetOfUser(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return flashcardSetService.listHistorySetOfUser(myUserDetail.getUser());
    }
    @GetMapping("/listbookmarkset")
    public List<SetSingleDTO> listBookMarkSetOfUser(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return flashcardSetService.listBookMarkSetOfUser(myUserDetail.getUser());
    }
    @GetMapping("/listbank")
    public CardBankDTO listManagerBankCard(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return flashcardSetService.listManagerBankCard(myUserDetail.getUser());
    }
    @GetMapping("/listsetpublic")
    public List<SetSingleDTO> listSetOfUserPublic(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return flashcardSetService.listSetOfUserPublic(myUserDetail.getUser());
    }

}
