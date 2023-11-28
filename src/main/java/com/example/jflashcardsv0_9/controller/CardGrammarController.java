package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.GrammarDTO;
import com.example.jflashcardsv0_9.dto.SetSingleDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/card")
public class CardGrammarController {
    private final FlashcardSetService flashcardSetService;
    @Autowired
    public CardGrammarController(FlashcardSetService flashcardSetService) {
        this.flashcardSetService = flashcardSetService;
    }
    @GetMapping("/grammar-card/list")
    public List<GrammarDTO> listBankGrammarCard(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return flashcardSetService.listBankGrammarCard(myUserDetail.getUser());
    }
    // phần xử lý Grammar card
    @PostMapping("/grammar-card")
    public ResponseEntity<?> createGrammarCard(@AuthenticationPrincipal MyUserDetail myUserDetail, @RequestBody GrammarDTO grammarDTO){
        flashcardSetService.createFlashcardGrammar(grammarDTO,myUserDetail.getUser());
        return ResponseEntity.ok("add thành công");
    }
    @PostMapping("/grammar-card/import")
    public ResponseEntity<?> importGrammarCardList(@AuthenticationPrincipal MyUserDetail myUserDetail, @RequestBody List<GrammarDTO> grammarDTOs){
        flashcardSetService.createFlashcardGrammarList(grammarDTOs,myUserDetail.getUser());
        return ResponseEntity.ok("add thành công");

    }
    @DeleteMapping ("/grammar-card/{cardId}")
    public List<SetSingleDTO> deleteGrammarCard(@PathVariable long cardId){
        return flashcardSetService.deleteFlGrammar(cardId);
    }
    @PutMapping ("/grammar-card/{cardId}")
    public List<SetSingleDTO> updateGrammarCard(@AuthenticationPrincipal MyUserDetail myUserDetail, @RequestBody GrammarDTO grammarDTO){
        return flashcardSetService.updateGrammarCard(grammarDTO,myUserDetail.getUser());
    }
}
