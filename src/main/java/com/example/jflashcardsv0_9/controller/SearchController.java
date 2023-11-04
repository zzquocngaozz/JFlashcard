package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/search")
public class SearchController {
    @Autowired
    private FlashcardSetService flashcardSetService;
//    @GetMapping({"","/", "/{title}"})//
//    public List<SetSingleDTO> searchFlashcardSetPublic (@PathVariable(required = false) String title) {
//        return flashcardSetService.searchFlashcardSetPublic(title);
//    }
    @GetMapping()
    public List<SetSingleDTO> searchFlashcardSetPublic(@RequestParam String q) {
        return flashcardSetService.searchFlashcardSetPublic(q);
    }
    @GetMapping("/top3")
    public List<SetSingleDTO> listTop3FlashcardSetPublic() {
        return flashcardSetService.listTop3VoteFlashcardSetPublic();
    }

}
