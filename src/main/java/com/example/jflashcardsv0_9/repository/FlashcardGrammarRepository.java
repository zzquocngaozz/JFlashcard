package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.FlashcardGrammar;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.FolderSet;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface FlashcardGrammarRepository extends JpaRepository<FlashcardGrammar, Integer> {
    FlashcardGrammar getFlashcardGrammarByCardGrammarId(long cardId);
    FlashcardGrammar getFlashcardGrammarByCardGrammarIdAndStatus(long cardId,long status);

    FlashcardGrammar save(FlashcardGrammar flashcardGrammar);
    List<FlashcardGrammar> getAllByUser(User user);
    @Override
    void delete(FlashcardGrammar flashcardGrammar);
    @Override
    <S extends FlashcardGrammar> List<S> saveAll(Iterable<S> entities);
    Long countByUser(User user);
    Long countByUserAndStatus(User user,int status);

}
