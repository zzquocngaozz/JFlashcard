package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.ClassRoomSingleDTO;
import com.example.jflashcardsv0_9.dto.HomePageDTO;
import com.example.jflashcardsv0_9.entities.ClassMember;
import com.example.jflashcardsv0_9.entities.ClassRoom;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.mapper.ClassroomMapper;
import com.example.jflashcardsv0_9.repository.ClassMemberRepository;
import com.example.jflashcardsv0_9.service.HomePageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HomePageServiceImpl implements HomePageService {
    @Autowired
    ClassMemberRepository classMemberRepository;
    @Override
    public HomePageDTO homePage(User user) {
        Pageable pageable = PageRequest.of(0, 3);
        List<ClassRoom> classrooms = classMemberRepository.findTop3NewestClassroomsByUser(user,pageable);
        List<ClassRoomSingleDTO> classRoomSingleDTOS = classrooms.stream()
                .map((ClassRoom classRoom) -> ClassroomMapper.convertClasRoomToClassRoomSingleDTO(classRoom))
                .collect(Collectors.toList());

        return HomePageDTO.builder()
                .setSingleDTOs(null)
                .classRoomSingleDTOs(classRoomSingleDTOS)
                .build();

    }
}
