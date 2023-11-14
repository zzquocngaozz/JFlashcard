package com.example.jflashcardsv0_9.repository;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
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

    @Query("SELECT COALESCE(COUNT(fs.flashcardSetId), 0) " +
            "FROM FlashcardSet fs " +
            "WHERE fs.type = :type ")
    Long getTotalSetByTypeOrdered(@Param("type") Long type);
}
