package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import com.example.jflashcardsv0_9.service.implement.FlashcardSetServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @GetMapping("/{setId}") // hàm xem thông tin set để user có thể thêm sửa xóa
    public FlashcardSetDTOResponse viewFlashcardSetResponse(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long setId) {
        return flashcardSetService.viewFlashcardSetResponse(setId,myUserDetail.getUser().getUserId());
    }
    @GetMapping("/{setId}/cardkanji") // gọi list thẻ kanji của bộ set
    public List<KanjiDTO> listCardKanji(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long setId) {
        return flashcardSetService.findAllKanjiDTOBySetId(setId,myUserDetail.getUser().getUserId());
    }
    @GetMapping("/{setId}/cardvpcab")
    public List<GrammarDTO> listCardVocab(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long setId) {
        return flashcardSetService.findAllGrammarDTOBySetId(setId,myUserDetail.getUser().getUserId());
    }
    @GetMapping("/{setId}/cardgrammar")
    public List<VocabDTO> listCardGrammar(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long setId) {
        return flashcardSetService.findAllVocabDTOBySetId(setId,myUserDetail.getUser().getUserId());
    }
    @PutMapping("/{setId}")//hàm  sửa lại thông tin bộ set
    public FlashcardSetDTOResponse updateFlashcardSetResponse(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody FlashcardSetDTORequest flashcardSetDTORequest,@PathVariable long setId) {
        return flashcardSetService.updateFlashcardSetResponse(flashcardSetDTORequest,setId,myUserDetail.getUser().getUserId());
    }

    @DeleteMapping("/{setId}")
    public ResponseEntity<?> deleteFlashcardSet(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long setId){
        flashcardSetService.deleteFlashcardSetById(setId,myUserDetail.getUser().getUserId());
        return ResponseEntity.ok("Xóa thành công");
    }

    // phần xử lý kanji card
    @PostMapping("/{setId}/edit/kanji-card")
    public KanjiDTO createKanjiCard(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody KanjiDTO kanjiDTO,@PathVariable long setId){
        return flashcardSetService.createFlashcardKanji(kanjiDTO,myUserDetail.getUser().getUserId(),setId);
    }
    @DeleteMapping ("/{setId}/edit/kanji-card/{cardId}")
    public ResponseEntity<?> deleteKanjiCard(@PathVariable long cardId){
        flashcardSetService.deleteFlKanji(cardId);
        return ResponseEntity.ok("Xóa thành công");
    }
    @PutMapping ("/{setId}/edit/kanji-card")
    public ResponseEntity<?> updateKanjiCard(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody KanjiDTO kanjiDTO,@PathVariable long setId){
        flashcardSetService.updateKanjiCard(kanjiDTO,myUserDetail.getUser().getUserId(),setId);
        return ResponseEntity.ok("update thành công");
    }
    // phần xử lý Grammar card
    @PostMapping("/{setId}/edit/grammar-card")
    public GrammarDTO createGrammarCard(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody GrammarDTO grammarDTO,@PathVariable long setId){
        return flashcardSetService.createFlashcardGrammar(grammarDTO,myUserDetail.getUser().getUserId(),setId);
    }
    @DeleteMapping ("/{setId}/edit/grammar-card/{cardId}")
    public ResponseEntity<?> deleteGrammarCard(@PathVariable long cardId){
        flashcardSetService.deleteFlGrammar(cardId);
        return ResponseEntity.ok("Xóa thành công");
    }
    @PutMapping ("/{setId}/edit/grammar-card")
    public ResponseEntity<?> updateGrammarCard(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody GrammarDTO grammarDTO,@PathVariable long setId){
        flashcardSetService.updateGrammarCard(grammarDTO,myUserDetail.getUser().getUserId(),setId);
        return ResponseEntity.ok("update thành công");
    }

    // phần xử lý Vocab card
    @PostMapping("/{setId}/edit/vocab-card")
    public VocabDTO createVocabCard(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody VocabDTO vocabDTO,@PathVariable long setId){
        return flashcardSetService.createFlashcardVocab(vocabDTO,myUserDetail.getUser().getUserId(),setId);
    }
    @DeleteMapping ("/{setId}/edit/vocab-card/{cardId}")
    public ResponseEntity<?> deleteVocabCard(@PathVariable long cardId){
        flashcardSetService.deleteFlvocab(cardId);
        return ResponseEntity.ok("Xóa thành công");
    }
    @PutMapping ("/{setId}/edit/vocab-card")
    public ResponseEntity<?> updateVocabCard(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody VocabDTO vocabDTO,@PathVariable long setId){
        flashcardSetService.updateVocabCard(vocabDTO,myUserDetail.getUser().getUserId(),setId);
        return ResponseEntity.ok("update thành công");
    }

}

