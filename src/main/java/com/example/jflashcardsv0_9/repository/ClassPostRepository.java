package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.ClassPost;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassPostRepository extends JpaRepository<ClassPost, Long> {
    List<ClassPost> findAllByUserOrderByCreatedAtDesc(User user);










    List<ClassPost> findAllByClassroomClassRoomIdOrderByCreatedAtDesc(Long classRoomId);
    Optional<ClassPost> findByClassPostId(long classPostId);
}
