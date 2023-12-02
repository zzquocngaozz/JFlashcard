package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.KanjiDTO;
import com.example.jflashcardsv0_9.dto.SetSingleDTO;
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
    public List<SetSingleDTO> deleteVocabCard(@PathVariable long cardId){
        return flashcardSetService.deleteFlvocab(cardId);
    }
    @PutMapping ("/vocab-card")
    public List<SetSingleDTO> updateVocabCard(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody VocabDTO vocabDTO){
        return flashcardSetService.updateVocabCard(vocabDTO,myUserDetail.getUser());
    }
}
