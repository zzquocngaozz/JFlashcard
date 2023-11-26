package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.FlashcardKanji;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.FlashcardSetAssociation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FlashcardSetAssociationRepository extends JpaRepository<FlashcardSetAssociation, Integer> {
    void deleteAllByFlashcardSet(FlashcardSet flashcardSet);
    List<FlashcardSetAssociation> findAllByFlashcardSet(FlashcardSet flashcardSet);
    @Query("SELECT fsa.cardId FROM FlashcardSetAssociation fsa WHERE fsa.flashcardSet = :flashcardSet")
    List<Long> findCardIdsByFlashcardSet(@Param("flashcardSet") FlashcardSet flashcardSet);
    FlashcardSetAssociation getFlashcardSetAssociationByFlashcardSetAndCardId(FlashcardSet flashcardSet,long cardId);

    @Query("SELECT fsa.flashcardSet " +
            "FROM FlashcardSetAssociation fsa " +
            "WHERE fsa.cardId = :cardId " +
            "AND fsa.flashcardSet.type = :type ")
    List<FlashcardSet> getAllFlashcardSetByCardIdAndType (@Param("cardId") long cardId,@Param("type") long type);

}
