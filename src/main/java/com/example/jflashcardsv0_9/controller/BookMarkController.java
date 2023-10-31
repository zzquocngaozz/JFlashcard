package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/bookmark")
public class BookMarkController {
    @Autowired
    private BookmarkService bookmarkService;

    @PostMapping("/{setId}")
    public ResponseEntity<?> bookMarkset(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long setId){
        bookmarkService.bookMarkSet(myUserDetail.getUser(),setId);
        return ResponseEntity.ok("Book mark thành công");
    }
    @PostMapping("/{setId}/bookcard/{cardId}")
    public ResponseEntity<?> bookMarkCard(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long setId, @PathVariable long cardId){
        bookmarkService.bookMarkCard(myUserDetail.getUser(),setId,cardId);
        return ResponseEntity.ok("Book mark thành công");
    }
}
