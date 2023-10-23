package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.UserRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRequestRepository extends JpaRepository<UserRequest,Long> {

        Optional<UserRequest> findByTokenAndUserEmail(String token, String email);
        Optional<UserRequest> findByToken(String token);

        Optional<UserRequest> findByRequestTypeAndUserEmail(int requestType, String email);

        List<UserRequest> findAllByRequestType(int requestType);
}
