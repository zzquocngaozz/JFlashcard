package com.example.jflashcardsv0_9.repository;


import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.TrackingProgress;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface TrackingProgressRepository extends JpaRepository<TrackingProgress,Long> {
    TrackingProgress save(TrackingProgress trackingProgress);
    List<TrackingProgress> getAllByUserAndFlashcardSet(User user, FlashcardSet flashcardSet);
    TrackingProgress getTrackingProgressByUserAndFlashcardSetAndCardId(User user, FlashcardSet flashcardSet, long cardId);
    boolean existsTrackingProgressByUserAndFlashcardSetAndCardId(User user, FlashcardSet flashcardSet, long cardId);
    @Query("SELECT COUNT(tp) FROM TrackingProgress tp " +
            "WHERE tp.user = :user " +
            "AND tp.flashcardSet = :flashcardSet " +
            "AND tp.createdAt < :timestamp")
    long countByUserAndFlashcardSetAndCreatedAtBefore(
            @Param("user") User user,
            @Param("flashcardSet") FlashcardSet flashcardSet,
            @Param("timestamp") Timestamp timestamp
    );
}
