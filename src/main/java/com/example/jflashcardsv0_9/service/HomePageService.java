package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.stereotype.Service;

@Service
public interface HomePageService {

    HomePageDTO homePage(User user);

    DashBoardDTO dashboard();

    WeekTrackingDTOResponse chartDashboard(WeekTrackingDTO weekTrackingDTO);

    LearnDashboardDTO weekTrackingHomeLearn(User user, WeekTrackingDTO weekTrackingDTO);

    TeacherDashboardDTO weekTrackingHomeTeacher(User user, WeekTrackingDTO weekTrackingDTO);
}
