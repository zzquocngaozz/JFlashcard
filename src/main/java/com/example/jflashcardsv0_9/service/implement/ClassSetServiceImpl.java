package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.ClassSetDTO;
import com.example.jflashcardsv0_9.dto.SetSingleDTO;
import com.example.jflashcardsv0_9.entities.ClassRoom;
import com.example.jflashcardsv0_9.entities.ClassSet;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.exception.AppException;
import com.example.jflashcardsv0_9.exception.Error;
import com.example.jflashcardsv0_9.exception.Validate;
import com.example.jflashcardsv0_9.mapper.FlashcardMapper;
import com.example.jflashcardsv0_9.mapper.UserMapper;
import com.example.jflashcardsv0_9.repository.ClassRoomRepository;
import com.example.jflashcardsv0_9.repository.ClassSetRepository;
import com.example.jflashcardsv0_9.repository.FlashcardSetRepository;
import com.example.jflashcardsv0_9.service.ClassSetService;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ClassSetServiceImpl implements ClassSetService {
    ClassRoomRepository classRoomRepository;
    ClassSetRepository classSetRepository;
    Validate validate;
    FlashcardSetService flashcardSetService;
    FlashcardSetRepository flashcardSetRepository;

    @Autowired
    public ClassSetServiceImpl(ClassRoomRepository classRoomRepository, ClassSetRepository classSetRepository, Validate validate, FlashcardSetService flashcardSetService, FlashcardSetRepository flashcardSetRepository) {
        this.classRoomRepository = classRoomRepository;
        this.classSetRepository = classSetRepository;
        this.validate = validate;
        this.flashcardSetService = flashcardSetService;
        this.flashcardSetRepository = flashcardSetRepository;
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

    @Override
    public List<SetSingleDTO> listSetOfUserInClass(User user,long classId) {
        List<FlashcardSet> flashcardSets1 = flashcardSetRepository.getAllByUser(user);
        List<FlashcardSet> flashcardSets2 = new ArrayList<>();
        ClassRoom classRoom = classRoomRepository.getClassRoomByClassRoomId(classId);
//        checkvalidate lai
//        validate.checkClassMember(user,classRoom);
        List<ClassSet> classSets = classSetRepository.findAllByClassRoom(classRoom);
        for (ClassSet classSet : classSets){
            flashcardSets2.add(classSet.getFlashcardSet());
        }
        flashcardSets1.removeAll(flashcardSets2);
        return flashcardSets1.stream()
                .map(FlashcardMapper::convertSetSingleDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void addSetOfUserInClass(User user, ClassSetDTO classSetDTO) {
        ClassRoom classRoom = classRoomRepository.getClassRoomByClassRoomId(classSetDTO.getClassRoomId());
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(classSetDTO.getFlashcardSetId());
        ClassSet classSet = ClassSet.builder()
                .classRoom(classRoom)
                .flashcardSet(flashcardSet)
                .createdAt(classSetDTO.getStartAt())
                .dueAt(classSetDTO.getDueAt())
                .build();
        classSetRepository.save(classSet);
    }

    @Override
    public void updateSetOfUserInClass(User user, ClassSetDTO classSetDTO) {
        ClassRoom classRoom = classRoomRepository.getClassRoomByClassRoomId(classSetDTO.getClassRoomId());
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(classSetDTO.getFlashcardSetId());
        ClassSet classSet = classSetRepository.getClassSetByClassRoomAndFlashcardSet(classRoom,flashcardSet);
        if(classSet == null){
            throw  new AppException(Error.INFO_NOT_FOUND);
        }
        classSet = ClassSet.builder()
                .createdAt(classSetDTO.getStartAt())
                .dueAt(classSetDTO.getDueAt())
                .build();
        classSetRepository.save(classSet);
    }


}
