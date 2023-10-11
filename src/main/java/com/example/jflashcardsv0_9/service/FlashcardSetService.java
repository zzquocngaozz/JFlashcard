package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.FlashcardSetDTORequest;
import com.example.jflashcardsv0_9.dto.FlashcardSetDTOResponse;
import com.example.jflashcardsv0_9.dto.IdDTO;

public interface FlashcardSetService {
    IdDTO createFlashcardSet(FlashcardSetDTORequest flashcardSetDTORequest, long userID);
    FlashcardSetDTOResponse updateFlashcardSetResponse(long setid,long userid);
}
