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
    @GetMapping("/{setId}")
    public FlashcardSetDTOResponse viewFlashcardSetResponse(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long setId) {
        return flashcardSetService.viewFlashcardSetResponse(setId,myUserDetail.getUser().getUserId());
    }
    @GetMapping("/{setId}/cardkanji")
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
    @PutMapping("/{setId}")
    public FlashcardSetDTOResponse updateFlashcardSetResponse(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody FlashcardSetDTORequest flashcardSetDTORequest,@PathVariable long setId) {
        return flashcardSetService.updateFlashcardSetResponse(flashcardSetDTORequest,setId,myUserDetail.getUser().getUserId());
    }

    @DeleteMapping("/{setId}")
    public ResponseEntity<?> deleteFlashcardSet(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long setId){
        flashcardSetService.deleteFlashcardSetById(setId,myUserDetail.getUser().getUserId());
        return ResponseEntity.ok("Xóa thành công");
    }

}

