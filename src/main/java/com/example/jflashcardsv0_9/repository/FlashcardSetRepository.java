package com.example.jflashcardsv0_9.repository;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FlashcardSetRepository extends JpaRepository<FlashcardSet, Integer>{
    FlashcardSet save(FlashcardSet flashcardSet);
}
