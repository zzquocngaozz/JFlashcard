package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.FlashcardSetDTORequest;
import com.example.jflashcardsv0_9.dto.FlashcardSetDTOResponse;
import com.example.jflashcardsv0_9.dto.IdDTO;
import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import com.example.jflashcardsv0_9.service.implement.FlashcardSetServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/createfls")
public class FlashcardSetController {
    @Autowired
    private FlashcardSetService flashcardSetService;

    @PostMapping
    public IdDTO createFlS(@AuthenticationPrincipal MyUserDetail myUserDetail, @RequestBody FlashcardSetDTORequest flashcardSetDTORequest) {
        return flashcardSetService.createFlashcardSet(flashcardSetDTORequest,myUserDetail.getUser().getUserId());
    }
    @PostMapping("/{setId}")
    public FlashcardSetDTOResponse login(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long setId) {
        return flashcardSetService.updateFlashcardSetResponse(setId,myUserDetail.getUser().getUserId());
    }
}

