package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.GrammarDTO;
import com.example.jflashcardsv0_9.dto.KanjiDTO;
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
public class CardKanjiController {
    private final FlashcardSetService flashcardSetService;
    @Autowired
    public CardKanjiController(FlashcardSetService flashcardSetService) {
        this.flashcardSetService = flashcardSetService;
    }
    @GetMapping("/kanji-card/list")
    public List<KanjiDTO> listBankKanjiCard(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return flashcardSetService.listBankKanjiCard(myUserDetail.getUser());
    }

//    phần xu ly kanji card
    @PostMapping("/kanji-card")
    public ResponseEntity<?> createKanjiCard(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody KanjiDTO kanjiDTO){
        flashcardSetService.createFlashcardKanji(kanjiDTO,myUserDetail.getUser());
        return ResponseEntity.ok("add thành công");

    }
    @PostMapping("/kanji-card/import")
    public ResponseEntity<?> importKanjiCardList(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody List<KanjiDTO> kanjiDTOs){
        flashcardSetService.createFlashcardKanjiList(kanjiDTOs,myUserDetail.getUser());
        return ResponseEntity.ok("add thành công");

    }
    @DeleteMapping ("/kanji-card/{cardId}")
    public ResponseEntity<?> deleteKanjiCard(@PathVariable long cardId){
        flashcardSetService.deleteFlKanji(cardId);
        return ResponseEntity.ok("Xóa thành công");
    }
    @PutMapping ("/kanji-card")
    public ResponseEntity<?> updateKanjiCard(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody KanjiDTO kanjiDTO){
        flashcardSetService.updateKanjiCard(kanjiDTO,myUserDetail.getUser());
        return ResponseEntity.ok("update thành công");
    }
}
