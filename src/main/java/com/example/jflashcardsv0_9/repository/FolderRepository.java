package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.Folder;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FolderRepository extends JpaRepository<Folder, Integer> {
    List<Folder> getAllByUser(User user);

    Folder save(Folder folder);
}
