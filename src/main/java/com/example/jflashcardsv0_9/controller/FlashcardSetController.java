package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/createfls")
public class FlashcardSetController {
    private final FlashcardSetService flashcardSetService;

    @Autowired
    public FlashcardSetController(FlashcardSetService flashcardSetService) {
        this.flashcardSetService = flashcardSetService;
    }

    @PostMapping
    public IdDTO createFlS(@AuthenticationPrincipal MyUserDetail myUserDetail, @RequestBody FlashcardSetDTORequest flashcardSetDTORequest) {
        return flashcardSetService.createFlashcardSet(flashcardSetDTORequest,myUserDetail.getUser().getUserId());
    }
    @GetMapping("/{setId}") // hàm xem thông tin set để user có thể thêm sửa xóa
    public FlashcardSetDTOResponse viewFlashcardSetResponse(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long setId) {
        return flashcardSetService.viewFlashcardSetResponse(setId,myUserDetail.getUser().getUserId());
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
    @GetMapping("/{setId}/cardgrammar")
    public List<GrammarDTO> listCardGrammar(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long setId) {
        return flashcardSetService.findAllGrammarDTOBySetId(setId,myUserDetail.getUser().getUserId());
    }
    @GetMapping("/{setId}/cardkanji") // gọi list thẻ kanji của bộ set
    public List<KanjiDTO> listCardKanji(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long setId) {
        return flashcardSetService.findAllKanjiDTOBySetId(setId,myUserDetail.getUser().getUserId());
    }
    @GetMapping("/{setId}/cardvpcab")
    public List<VocabDTO> listCardVocab(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long setId) {
        return flashcardSetService.findAllVocabDTOBySetId(setId,myUserDetail.getUser().getUserId());
    }//     phan xu ly Vocab card

//

    //int


}

