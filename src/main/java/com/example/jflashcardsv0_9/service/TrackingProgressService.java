package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.TrackingClassSetSTO;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.stereotype.Service;

@Service
public interface TrackingProgressService {
    void trackingProgress(User user,long setId,long cardId);

    TrackingClassSetSTO trackingProgressClassSet(User user, long classId, long classSetId);
}
