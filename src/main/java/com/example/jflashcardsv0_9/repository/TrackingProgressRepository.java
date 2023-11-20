package com.example.jflashcardsv0_9.repository;


import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.TrackingProgress;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
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
            "WHERE tp.flashcardSet.status = :status " +
            "GROUP BY tp.flashcardSet " +
            "ORDER BY COUNT(DISTINCT tp.user)")
    List<FlashcardSet> getTopFlashcardSetsWithMostUsers(@Param("status") int status,Pageable pageable);
    @Query("SELECT tp.user, COUNT(DISTINCT tp.flashcardSet) as flashcardSetCount " +
            "FROM TrackingProgress tp " +
            "GROUP BY tp.user " +
            "ORDER BY flashcardSetCount DESC")
    List<Object[]> getTopUsersWithLearnedFlashcardSets(Pageable pageable);
    @Query("SELECT COALESCE(COUNT(DISTINCT tp.cardId), 0) " +
            "FROM TrackingProgress tp " +
            "WHERE DATE(tp.timeLearn) = :date " +
            "AND tp.user = :userId " +
            "AND tp.flashcardSet = :flashcardSetId ")
    List<Long> getTotalCardsByDayClassSet(
            @Param("date") Date date,
            @Param("userId") User user,
            @Param("flashcardSetId") FlashcardSet flashcardSetId
    );
    @Query("SELECT COALESCE(COUNT(DISTINCT tp.cardId), 0) " +
            "FROM TrackingProgress tp " +
            "WHERE DATE(tp.timeLearn) = :date " +
            "AND tp.user = :userId ")
    List<Long> getTotalCardsByDayHomePage(
            @Param("date") Date date,
           @Param("userId") User user
    );
    @Query("SELECT COUNT(DISTINCT tp.flashcardSet) " +
            "FROM TrackingProgress tp " +
            "WHERE DATE(tp.timeLearn) = :date ")
    List<Long> countDistinctFlashcardSetsByDate(@Param("date") Date date);
    @Query("SELECT MIN(DATE(tp.timeLearn)) " +
            "FROM TrackingProgress tp " +
            "WHERE tp.user = :user " +
            "AND tp.flashcardSet = :flashcard " +
            "GROUP BY DATE(tp.timeLearn)")
    Date getTimeLearnOld(@Param("user") User user, @Param("flashcard") FlashcardSet flashcard);
    @Query("SELECT MAX(DATE(tp.timeLearn)) " +
            "FROM TrackingProgress tp " +
            "WHERE tp.user = :user " +
            "AND tp.flashcardSet = :flashcard " +
            "GROUP BY DATE(tp.timeLearn)")
    Date getTimeLearnNew(@Param("user") User user, @Param("flashcard") FlashcardSet flashcard);
    List<TrackingProgress> getDistinctByUserAndFlashcardSetAndTimeLearnBetween(User user,FlashcardSet flashcardSet,Timestamp start,Timestamp end);

}
