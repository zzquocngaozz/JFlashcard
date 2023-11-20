package com.example.jflashcardsv0_9.repository;


import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.OpenedFlashcardSet;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OpenedFlashcardSetRepository extends JpaRepository<OpenedFlashcardSet, Long> {
    OpenedFlashcardSet save(OpenedFlashcardSet openedFlashcardSet);
    OpenedFlashcardSet getOpenedFlashcardSetByFlashcardSetAndUser(FlashcardSet flashcardSet, User user);
    @Query("SELECT ofs FROM OpenedFlashcardSet ofs WHERE ofs.user = :user ORDER BY ofs.openedAt DESC")
    List<OpenedFlashcardSet> findAllByUserOrderByOpenedAtDesc(@Param("user") User user);
    @Query("SELECT ofs FROM OpenedFlashcardSet ofs WHERE ofs.user = :user ORDER BY ofs.openedAt DESC")
    List<OpenedFlashcardSet> findTop3ByUserOrderByOpenedAtDesc(@Param("user") User user, Pageable pageable);
    List<OpenedFlashcardSet> findAllByUserAndFlashcardSet_StatusOrderByOpenedAtDesc(User user,int status);
    List<OpenedFlashcardSet> getAllByUserAndFlashcardSet_StatusOrderByOpenedAtDesc(User user,int status,Pageable pageable);

}
