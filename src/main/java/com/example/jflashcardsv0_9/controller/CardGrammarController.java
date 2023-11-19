package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.GrammarDTO;
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
    public ResponseEntity<?> deleteGrammarCard(@PathVariable long cardId){
        flashcardSetService.deleteFlGrammar(cardId);
        return ResponseEntity.ok("Xóa thành công");
    }
    @PutMapping ("/grammar-card/{cardId}")
    public ResponseEntity<?> updateGrammarCard(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody GrammarDTO grammarDTO){
        flashcardSetService.updateGrammarCard(grammarDTO,myUserDetail.getUser());
        return ResponseEntity.ok("update thành công");
    }
}
