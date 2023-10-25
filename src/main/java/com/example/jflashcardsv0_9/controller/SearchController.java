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
@RequestMapping("/api/v1/search")
public class SearchController {
    @Autowired
    private FlashcardSetService flashcardSetService;
    @GetMapping({"","/", "/{title}"})//
    public List<SetSingleDTO> searchFlashcardSetPublic (@PathVariable(required = false) String title) {
        if (title == null) {
            title = ""; // Gán giá trị mặc định là chuỗi rỗng nếu title là null
        }
        return flashcardSetService.searchFlashcardSetPublic(title);
    }

}
