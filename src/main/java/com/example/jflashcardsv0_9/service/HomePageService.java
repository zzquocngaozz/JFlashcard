package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.DashBoardDTO;
import com.example.jflashcardsv0_9.dto.HomePageDTO;
import com.example.jflashcardsv0_9.dto.WeekTrackingDTO;
import com.example.jflashcardsv0_9.dto.WeekTrackingDTOResponse;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.stereotype.Service;

@Service
public interface HomePageService {

    HomePageDTO homePage(User user);

    DashBoardDTO dashboard();

    WeekTrackingDTOResponse chartDashboard(WeekTrackingDTO weekTrackingDTO);
}
