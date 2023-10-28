package com.example.jflashcardsv0_9.repository;


import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.TrackingProgress;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrackingProgressRepository extends JpaRepository<TrackingProgress,Long> {
    TrackingProgress save(TrackingProgress trackingProgress);
    List<TrackingProgress> getAllByUserAndFlashcardSet(User user, FlashcardSet flashcardSet);
    TrackingProgress getTrackingProgressByUserAndFlashcardSetAndCardId(User user, FlashcardSet flashcardSet, long cardId);
    boolean existsTrackingProgressByUserAndFlashcardSetAndCardId(User user, FlashcardSet flashcardSet, long cardId);
}
