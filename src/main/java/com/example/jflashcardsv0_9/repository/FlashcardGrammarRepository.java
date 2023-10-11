package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.FlashcardGrammar;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface FlashcardGrammarRepository extends JpaRepository<FlashcardGrammar, Integer> {
    List<FlashcardGrammar> findAllByFlashcardSet(FlashcardSet flashcardSet);
}