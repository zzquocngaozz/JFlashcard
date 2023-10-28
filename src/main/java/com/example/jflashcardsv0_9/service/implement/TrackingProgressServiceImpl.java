package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.TrackingProgress;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.repository.FlashcardSetRepository;
import com.example.jflashcardsv0_9.repository.TrackingProgressRepository;
import com.example.jflashcardsv0_9.service.TrackingProgressService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TrackingProgressServiceImpl implements TrackingProgressService {
    @Autowired
    TrackingProgressRepository trackingProgressRepository;
    @Autowired
    FlashcardSetRepository flashcardSetRepository;
    @Override
    public void trackingProgress(User user, long setId, long cardId) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        TrackingProgress trackingProgress = trackingProgressRepository.getTrackingProgressByUserAndFlashcardSetAndCardId(user,flashcardSet,cardId) ;
        if(trackingProgress == null ) {
            trackingProgress.setUser(user);
            trackingProgress.setFlashcardSet(flashcardSet);
            trackingProgress.setCardId(cardId);
            trackingProgress.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            trackingProgress.setLastLearn(new Timestamp(System.currentTimeMillis()));
        }else {
            trackingProgress.setLastLearn(new Timestamp(System.currentTimeMillis()));
        }
        trackingProgressRepository.save(trackingProgress);

    }
}
