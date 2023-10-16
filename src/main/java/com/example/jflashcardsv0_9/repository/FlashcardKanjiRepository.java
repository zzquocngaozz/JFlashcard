package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.FlashcardKanji;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface FlashcardKanjiRepository extends JpaRepository<FlashcardKanji, Integer> {
    List<FlashcardKanji> findAllByFlashcardSet(FlashcardSet flashcardSet);
    FlashcardKanji getFlashcardKanjiByCardKanjiId(long cardId);
    FlashcardKanji save(FlashcardKanji flashcardKanji);
    @Override
    void delete(FlashcardKanji flashcardKanji);

}
