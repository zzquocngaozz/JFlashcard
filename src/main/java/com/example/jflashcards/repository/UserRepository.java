package com.example.jflashcards.repository;

import com.example.jflashcards.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User getUserByUserName(String userName);

    User getUserByUserId(int id);

    long count();

    User getUserByEmail(String email);

    User getUserByUserId(Integer id);

    List<User> findAll();

    public User save(User user);
}
