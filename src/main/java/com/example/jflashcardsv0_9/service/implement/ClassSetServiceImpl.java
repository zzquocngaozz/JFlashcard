package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.ClassSetDTO;
import com.example.jflashcardsv0_9.entities.ClassRoom;
import com.example.jflashcardsv0_9.entities.ClassSet;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.exception.Validate;
import com.example.jflashcardsv0_9.mapper.UserMapper;
import com.example.jflashcardsv0_9.repository.ClassRoomRepository;
import com.example.jflashcardsv0_9.repository.ClassSetRepository;
import com.example.jflashcardsv0_9.service.ClassSetService;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ClassSetServiceImpl implements ClassSetService {
    ClassRoomRepository classRoomRepository;
    ClassSetRepository classSetRepository;
    Validate validate;
    FlashcardSetService flashcardSetService;
    @Autowired
    public ClassSetServiceImpl(ClassRoomRepository classRoomRepository, ClassSetRepository classSetRepository, Validate validate, FlashcardSetService flashcardSetService) {
        this.classRoomRepository = classRoomRepository;
        this.classSetRepository = classSetRepository;
        this.validate = validate;
        this.flashcardSetService = flashcardSetService;
    }

    @Override
    public List<ClassSetDTO> listClassSet(User user, long classId) {
        ClassRoom classRoom = classRoomRepository.getClassRoomByClassRoomId(classId);
        validate.checkClassMember(user,classRoom);
        List<ClassSet> classSets = classSetRepository.findAllByClassRoom(classRoom);
        List<ClassSetDTO> classSetDTOS = new ArrayList<>();
        for (ClassSet classSet : classSets){
            classSetDTOS.add(ClassSetDTO.builder()
                            .classSetId(classSet.getClassSetId())
                            .startAt(classSet.getCreatedAt())
                            .dueAt(classSet.getDueAt())
                            .classRoomId(classId)
                            .flashcardSetId(classSet.getFlashcardSet().getFlashcardSetId())
                            .title(classSet.getFlashcardSet().getTitle())
                            .isPrivate(classSet.getFlashcardSet().isPrivate())
                            .type(classSet.getFlashcardSet().getType())
                            .numberCard(flashcardSetService.numberCard(classSet.getFlashcardSet().getFlashcardSetId(),classSet.getFlashcardSet().getType()))
                            .authDTO(UserMapper.toAuthDTO(classSet.getFlashcardSet().getUser()))
                    .build()
            );
        }
        return classSetDTOS;

    }
}
