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
    List<FlashcardSet> findAllByTitleContainingAndStatus (String title, int status);
    @Override
    void delete(FlashcardSet flashcardSet);
    boolean existsFlashcardSetByFlashcardSetId(long setid);

    List<FlashcardSet> getAllByUser(User user);
    List<FlashcardSet> getAllByStatus(int  status);
    @Query("SELECT fs FROM FlashcardSet fs " +
            "JOIN fs.user u " +
            "JOIN u.roles r " +
            "WHERE fs.status IN :statusList " +
            "AND r.name = :teacher ")
    List<FlashcardSet> findAllByStatusInAndUserHasTeacherRole(@Param("statusList") List<Integer> statusList
            ,@Param("teacher") String  roleName);

    List<FlashcardSet> getAllByUserAndStatus(User user,int status);

    Long countAllByStatus(int status);

    @Query("SELECT COALESCE(COUNT(fs.flashcardSetId), 0) " +
            "FROM FlashcardSet fs " +
            "WHERE fs.type = :type ")
    Long getTotalSetByTypeOrdered(@Param("type") Long type);
    Long countAllByUserAndType(User user,int type);
    Long countAllByUser(User user);
    Long countAllByUserAndStatus(User user,int status);
}
