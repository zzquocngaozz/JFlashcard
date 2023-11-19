package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface FlashcardVocabRepository extends JpaRepository<FlashcardVocab, Integer> {
    FlashcardVocab getFlashcardVocabByCardVocabId(long cardId);
    FlashcardVocab getFlashcardVocabByCardVocabIdAndStatus(long cardId,long status);
    FlashcardVocab save(FlashcardVocab flashcardVocab);
    List<FlashcardVocab> getAllByUser(User user);

    @Override
    void delete(FlashcardVocab flashcardVocab);

    @Override
    <S extends FlashcardVocab> List<S> saveAll(Iterable<S> entities);

}
