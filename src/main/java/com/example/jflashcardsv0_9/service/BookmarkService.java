package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.entities.User;
import org.springframework.stereotype.Service;

@Service
public interface BookmarkService {
    void bookMarkset(User user, long setId);
    void bookMarkCard(User user, long setId,long cardId);
}
