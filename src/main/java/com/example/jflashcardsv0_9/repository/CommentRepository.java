package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    Comment save(Comment comment);
    void delete(Comment comment);
}
