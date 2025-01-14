package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.ClassRoom;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassRoomRepository extends JpaRepository<ClassRoom,Long> {
    ClassRoom getClassRoomByClassRoomId(long classId);
    ClassRoom getClassRoomByClassRoomCode(String classCode);
List<ClassRoom> findAllByTeacher(User user);
    Optional<ClassRoom> findByClassRoomCode(String classCode);
}
