package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.FlashcardSetAssociation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlashcardSetAssociationRepository extends JpaRepository<FlashcardSetAssociation, Integer> {
    void deleteAllByFlashcardSet(FlashcardSet flashcardSet);
    List<FlashcardSetAssociation> findAllByFlashcardSet(FlashcardSet flashcardSet);
    @Query("SELECT fsa.cardId FROM FlashcardSetAssociation fsa WHERE fsa.flashcardSet = :flashcardSet")
    List<Long> findCardIdsByFlashcardSet(FlashcardSet flashcardSet);
}
