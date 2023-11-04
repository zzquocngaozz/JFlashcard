package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.ClassSetDTO;
import com.example.jflashcardsv0_9.dto.SetSingleDTO;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClassSetService {
    List<ClassSetDTO> listClassSet(User user, long classId);

    List<SetSingleDTO> listSetOfUserInClass(User user,long classId);

    void addSetOfUserInClass(User user, ClassSetDTO classSetDTO);

    void updateSetOfUserInClass(User user, ClassSetDTO classSetDTO);
}
