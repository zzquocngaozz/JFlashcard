package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.FlashcardGrammar;
import com.example.jflashcardsv0_9.entities.FlashcardKanji;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface FlashcardKanjiRepository extends JpaRepository<FlashcardKanji, Integer> {
    FlashcardKanji getFlashcardKanjiByCardKanjiId(long cardId);
    FlashcardKanji getFlashcardKanjiByCardKanjiIdAndStatus(long cardId,long status);
    FlashcardKanji save(FlashcardKanji flashcardKanji);
    List<FlashcardKanji> getAllByUser(User user);

    @Override
    void delete(FlashcardKanji flashcardKanji);
    @Override
    <S extends FlashcardKanji> List<S> saveAll(Iterable<S> entities);
    Long countByUser(User user);
    Long countByUserAndStatus(User user,int status);

}
