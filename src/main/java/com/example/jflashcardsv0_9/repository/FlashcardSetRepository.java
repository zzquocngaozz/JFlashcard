package com.example.jflashcardsv0_9.repository;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlashcardSetRepository extends JpaRepository<FlashcardSet, Integer>{
    FlashcardSet save(FlashcardSet flashcardSet);
    FlashcardSet getFlashcardSetByFlashcardSetId(long setId);
    List<FlashcardSet> findAllByTitleContainingAndIsPrivate (String title, boolean isPrivate);
    @Override
    void delete(FlashcardSet flashcardSet);
    boolean existsFlashcardSetByFlashcardSetId(long setid);

    List<FlashcardSet> getAllByUser(User user);
}
