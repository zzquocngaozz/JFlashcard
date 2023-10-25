package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.FlashcardGrammar;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.FlashcardVocab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface FlashcardVocabRepository extends JpaRepository<FlashcardVocab, Integer> {
    List<FlashcardVocab> findAllByFlashcardSet(FlashcardSet flashcardSet);
    FlashcardVocab getFlashcardVocabByCardVocabId(long cardId);
    FlashcardVocab save(FlashcardVocab flashcardVocab);
    @Override
    void delete(FlashcardVocab flashcardVocab);

    @Override
    <S extends FlashcardVocab> List<S> saveAll(Iterable<S> entities);

}
