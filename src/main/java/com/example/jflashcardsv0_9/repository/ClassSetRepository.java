package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.ClassRoom;
import com.example.jflashcardsv0_9.entities.ClassSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassSetRepository extends JpaRepository<ClassSet,Long> {
    List<ClassSet> findAllByClassRoom(ClassRoom classRoom);
}
