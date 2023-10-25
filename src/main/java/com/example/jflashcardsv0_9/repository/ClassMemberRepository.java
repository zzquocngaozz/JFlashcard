package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.ClassMember;
import com.example.jflashcardsv0_9.entities.ClassRoom;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ClassMemberRepository extends JpaRepository<ClassMember,Long> {
    List<ClassMember> findAllByClassroom(ClassRoom classRoom);
    List<ClassMember> findAllByUser(User user);

}
