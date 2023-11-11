package com.example.jflashcardsv0_9.repository;


import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.TrackingProgress;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.domain.Pageable;
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
    @Query("SELECT COUNT(DISTINCT tp.cardId) FROM TrackingProgress tp " +
            "WHERE tp.user = :user " +
            "AND tp.flashcardSet = :flashcardSet " +
            "AND tp.timeLearn BETWEEN :startTimestamp AND :endTimestamp")
    long countByUserAndFlashcardSetAndTimeLearnBetween(
            @Param("user") User user,
            @Param("flashcardSet") FlashcardSet flashcardSet,
            @Param("startTimestamp") Timestamp startTimestamp,
            @Param("endTimestamp") Timestamp endTimestamp);
    @Query("SELECT DISTINCT tp.cardId FROM TrackingProgress tp " +
            "WHERE tp.user = :user " +
            "AND tp.flashcardSet = :flashcardSet")
    List<Long> findDistinctCardIdsByUserAndFlashcardSet(
            @Param("user") User user,
            @Param("flashcardSet") FlashcardSet flashcardSet);
    @Query("SELECT tp.flashcardSet " +
            "FROM TrackingProgress tp " +
            "GROUP BY tp.flashcardSet " +
            "ORDER BY COUNT(DISTINCT tp.user)")
    List<FlashcardSet> getTopFlashcardSetsWithMostUsers(Pageable pageable);
    @Query("SELECT tp.user, COUNT(DISTINCT tp.flashcardSet) as flashcardSetCount " +
            "FROM TrackingProgress tp " +
            "GROUP BY tp.user " +
            "ORDER BY flashcardSetCount DESC")
    List<Object[]> getTopUsersWithLearnedFlashcardSets(Pageable pageable);
}
