package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.FolderSet;
import com.example.jflashcardsv0_9.entities.VotePoint;
import com.example.jflashcardsv0_9.repository.FlashcardSetRepository;
import com.example.jflashcardsv0_9.repository.VotePointRepository;
import com.example.jflashcardsv0_9.service.VotePointService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VotePointServiceImpl implements VotePointService {
    @Autowired
    VotePointRepository votePointRepository;
    @Autowired
    FlashcardSetRepository flashcardSetRepository;
    @Override
    public long currentNumberVoteBySetId(long setId) {
        List<VotePoint> votePoints = votePointRepository.findAllByFlashcardSet(flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId));
        if (votePoints == null) {
            // Handle the case when the FolderSet doesn't exist.
            return 0L;
        }

        return (long) votePoints.size();
    }
    @Override
    public float countNumberVoteBySetId(long setId) {
        Float averagePoint = votePointRepository.calculateAveragePointByFlashcardSetId(setId);
        if (averagePoint != null) {
            float floatValue = averagePoint.floatValue();
            float roundedValue = roundToDecimalPlace(floatValue, 1); // Làm tròn đến 1 chữ số sau dấu thập phân
            return roundedValue;
            // Sử dụng floatValue ở đây
        } else {
            return  0;
        }
    }
    public static float roundToDecimalPlace(float value, int decimalPlaces) {
        if (decimalPlaces < 0) {
            throw new IllegalArgumentException("decimalPlaces phải lớn hơn hoặc bằng 0");
        }
        double scaleFactor = Math.pow(10, decimalPlaces);
        return (float) Math.round(value * scaleFactor) / (float) scaleFactor;
    }
}