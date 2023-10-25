package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.HomePageDTO;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.service.HomePageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HomePageServiceImpl implements HomePageService {
    @Override
    public HomePageDTO homePage(User user) {
        return null;
    }
}
