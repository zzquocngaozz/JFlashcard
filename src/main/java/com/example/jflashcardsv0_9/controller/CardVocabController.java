package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.KanjiDTO;
import com.example.jflashcardsv0_9.dto.VocabDTO;
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
public class CardVocabController {
    private final FlashcardSetService flashcardSetService;
    @Autowired
    public CardVocabController(FlashcardSetService flashcardSetService) {
        this.flashcardSetService = flashcardSetService;
    }
    @GetMapping("/vocab-card/list")
    public List<VocabDTO> listBankVocabCard(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return flashcardSetService.listBankVocabCard(myUserDetail.getUser());
    }
    @PostMapping("/vocab-card")
    public ResponseEntity<?> createVocabCard(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody VocabDTO vocabDTO){
        flashcardSetService.createFlashcardVocab(vocabDTO,myUserDetail.getUser());
        return ResponseEntity.ok("add thành công");

    }
    @PostMapping("/vocab-card/import")
    public ResponseEntity<?> importVocabCardList(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody List<VocabDTO> vocabDTOs){
        flashcardSetService.createFlashcardVocabList(vocabDTOs,myUserDetail.getUser());
        return ResponseEntity.ok("add thành công");

    }
    @DeleteMapping ("/vocab-card/{cardId}")
    public ResponseEntity<?> deleteVocabCard(@PathVariable long cardId, @PathVariable String setId){
        flashcardSetService.deleteFlvocab(cardId);
        return ResponseEntity.ok("Xóa thành công");
    }
    @PutMapping ("/vocab-card")
    public ResponseEntity<?> updateVocabCard(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody VocabDTO vocabDTO){
        flashcardSetService.updateVocabCard(vocabDTO,myUserDetail.getUser());
        return ResponseEntity.ok("update thành công");
    }
}
