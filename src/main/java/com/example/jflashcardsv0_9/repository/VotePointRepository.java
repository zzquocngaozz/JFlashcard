package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.VotePoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VotePointRepository extends JpaRepository<VotePoint, Integer> {
    List<VotePoint> findAllByFlashcardSet(FlashcardSet flashcardSet);
    @Query("SELECT AVG(vp.point) FROM VotePoint vp WHERE vp.flashcardSet.flashcardSetId = :flashcardSetId")
    Float calculateAveragePointByFlashcardSetId(@Param("flashcardSetId") Long flashcardSetId);
}
