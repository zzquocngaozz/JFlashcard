package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.SetSingleDTO;
import com.example.jflashcardsv0_9.dto.TokenDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/managerset")
public class ManagerSetController {
    @Autowired
    FlashcardSetService flashcardSetService;

    @GetMapping
    public List<SetSingleDTO> listManagerSet(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return flashcardSetService.listManagerSet(myUserDetail.getUser());
    }
    @PutMapping("/{setId}/accept")
    public ResponseEntity<?> acceptFlashcardSet(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long setId){
        flashcardSetService.acceptFlashcardSet(setId,myUserDetail.getUser());
        return ResponseEntity.ok("accept thành công");
    }
    @PutMapping("/{setId}/rejected")
    public ResponseEntity<?> rejectedFlashcardSet(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long setId, @RequestBody TokenDTO tokenDTO){
        flashcardSetService.rejectedFlashcardSet(setId,myUserDetail.getUser(),tokenDTO);
        return ResponseEntity.ok("rejected thành công");
    }
//    @GetMapping
//    public List<SetSingleDTO> listManagerSetUpdate(@AuthenticationPrincipal MyUserDetail myUserDetail){
//        return flashcardSetService.listManagerSetUpdate(myUserDetail.getUser());
//    }

}
