package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
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
        return flashcardSetService.createFlashcardSet(flashcardSetDTORequest,myUserDetail.getUser());
    }
    @GetMapping("/{setId}") // hàm xem thông tin set để user có thể thêm sửa xóa
    public FlashcardSetDTOResponse viewFlashcardSetResponse(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long setId) {
        return flashcardSetService.viewFlashcardSetResponse(setId,myUserDetail.getUser());
    }

    @PutMapping("/{setId}")//hàm  sửa lại thông tin bộ set
    public FlashcardSetDTOResponse updateFlashcardSetResponse(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody FlashcardSetDTORequest flashcardSetDTORequest,@PathVariable long setId) {
        return flashcardSetService.updateFlashcardSetResponse(flashcardSetDTORequest,setId,myUserDetail.getUser());
    }

    @DeleteMapping("/{setId}")
    public ResponseEntity<?> deleteFlashcardSet(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long setId){
        flashcardSetService.deleteFlashcardSetById(setId,myUserDetail.getUser());
        return ResponseEntity.ok("Close thành công");
    }
    @GetMapping("/{setId}/card")
    public Collection<? extends Card> listCardInSet(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long setId) {
        return flashcardSetService.listCardInSet(setId,myUserDetail.getUser());
    }
    @DeleteMapping("/{setId}/card/{cardId}")
    public ResponseEntity<?> deleteCardInSet(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long setId, @PathVariable long cardId) {
        flashcardSetService.deleteCardInSet(setId,myUserDetail.getUser(),cardId);
        return ResponseEntity.ok("add successfully");
    }
    //     phan xu ly  card bank theo type cua set
    @GetMapping("/{setId}/bankcard")
    public Collection<? extends Card> listCardBankBySet(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long setId) {
        return flashcardSetService.listCardBankBySet(setId,myUserDetail.getUser());
    }//
    @PostMapping("/{setId}/bankcard")
    public ResponseEntity<?> addCardInSet(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long setId,@RequestBody DataCardIdDto dto) {
        flashcardSetService.addCardInSet(myUserDetail.getUser(),setId,dto);
        return ResponseEntity.ok("add successfully");
    }


}

