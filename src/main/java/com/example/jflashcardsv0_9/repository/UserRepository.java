package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User getUserByUserName(String userName);
    User getUserByUserId(long userid);
    long count();
    Optional<User> findByUserName(String username);
    Optional<User> findByEmail(String email);
    User findUserByUserName(String Username);
    User findUserByEmail(String email);
    Optional<User> findByUserId(long  userId);

    List<User> findAll();
    User save(User user);
    boolean existsByUserName(String username);
    boolean existsByEmail(String email);
}
