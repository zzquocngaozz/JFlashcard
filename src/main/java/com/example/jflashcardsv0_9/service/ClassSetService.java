package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.entities.User;
import org.springframework.stereotype.Service;

@Service
public interface ClassSetService {
    void listClassSet(User user, long classId);
}
