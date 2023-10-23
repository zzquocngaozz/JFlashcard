package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.FolderSet;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface FolderRepository extends JpaRepository<FolderSet, Long> {
    @Query("SELECT f FROM FolderSet f WHERE f.user = :user ORDER BY f.createdAt DESC")
    List<FolderSet> getAllByUser(User user);

    Optional<FolderSet> findByFolderId(long  folderId);

    FolderSet save(FolderSet folderSet);

    FolderSet getFolderSetByFolderId(long folderId);

    @Override
    void delete(FolderSet entity);
}
