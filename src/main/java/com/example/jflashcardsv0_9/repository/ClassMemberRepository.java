package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.ClassMember;
import com.example.jflashcardsv0_9.entities.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassMemberRepository extends JpaRepository<ClassMember,Long> {

}
