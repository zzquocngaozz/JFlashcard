package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.FlashcardVocab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface FlashcardVocabRepository extends JpaRepository<FlashcardVocab, Integer> {
    List<FlashcardVocab> findAllByFlashcardSet(FlashcardSet flashcardSet);
}