package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/homepage/CreateFLS")
public class FlashcardSetController {
//    @PostMapping()
//    public List<UserDTO> CreateFlashcardSetKanji(@AuthenticationPrincipal MyUserDetail myUserDetail){
//        System.out.println(myUserDetail.getUser().getUserName());
//        return userService.findAllUser();
//    }
//    @PostMapping("/CreateSetKanji")
//    public List<UserDTO> CreateFlashcardSetKanji(@AuthenticationPrincipal MyUserDetail myUserDetail){
//        System.out.println(myUserDetail.getUser().getUserName());
//        return userService.findAllUser();
//    }
}
