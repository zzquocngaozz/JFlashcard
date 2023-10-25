package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRoomRepository extends JpaRepository<ClassRoom,Long> {
    ClassRoom getClassRoomByClassRoomId(long classId);
}
