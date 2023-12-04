package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.TrackingClassSetSTO;
import com.example.jflashcardsv0_9.dto.TrackingDTOResponse;
import com.example.jflashcardsv0_9.dto.WeekTrackingDTO;
import com.example.jflashcardsv0_9.dto.WeekTrackingDTOResponse;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public interface TrackingProgressService {
    void trackingProgress(User user,long setId,long cardId);

    TrackingClassSetSTO trackingProgressClassSet(User user, long classId, long classSetId);

    void sendMailTracking(TrackingDTOResponse trackingDTOResponse);

    WeekTrackingDTOResponse weekTrackingClassSet(WeekTrackingDTO weekTrackingDTO);

}
