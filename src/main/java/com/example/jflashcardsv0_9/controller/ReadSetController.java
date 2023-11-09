package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.IdDTO;
import com.example.jflashcardsv0_9.dto.ReadSetDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/read")
public class ReadSetController {
    @Autowired
    private FlashcardSetService flashcardSetService;

    @GetMapping("/{setId}")//
    public ReadSetDTO readFlashcardSet (@PathVariable(required = false) long setId, @AuthenticationPrincipal MyUserDetail myUserDetail) {
        return flashcardSetService.readFlashcardSet(myUserDetail.getUser(),setId);
    }
    @PostMapping ("/{setId}/vote")//
    public ResponseEntity<?> voteFlashcardSet (@PathVariable(required = false) long setId, @AuthenticationPrincipal MyUserDetail myUserDetail, @RequestBody IdDTO idDTO ) {
        flashcardSetService.voteFlashcardSet(myUserDetail.getUser(),setId,idDTO);
        return ResponseEntity.ok("vote thanh cong");
    }
    @GetMapping("/preview/{setId}")//
    public ReadSetDTO readFlashcardSetPublicOfGuest (@PathVariable(required = false) long setId) {
        return flashcardSetService.readFlashcardSetOfGuest(setId);
    }
}
