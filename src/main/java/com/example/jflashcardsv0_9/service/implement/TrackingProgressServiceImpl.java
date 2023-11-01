package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.TrackingClassSetSTO;
import com.example.jflashcardsv0_9.entities.*;
import com.example.jflashcardsv0_9.exception.Validate;
import com.example.jflashcardsv0_9.repository.*;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import com.example.jflashcardsv0_9.service.TrackingProgressService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TrackingProgressServiceImpl implements TrackingProgressService {
    TrackingProgressRepository trackingProgressRepository;
    FlashcardSetRepository flashcardSetRepository;
    Validate validate;
    ClassRoomRepository classRoomRepository;
    ClassSetRepository classSetRepository;
    FlashcardSetService flashcardSetService;
    ClassMemberRepository classMemberRepository;
    @Autowired
    public TrackingProgressServiceImpl(TrackingProgressRepository trackingProgressRepository, FlashcardSetRepository flashcardSetRepository, Validate validate, ClassRoomRepository classRoomRepository, ClassSetRepository classSetRepository, FlashcardSetService flashcardSetService, ClassMemberRepository classMemberRepository) {
        this.trackingProgressRepository = trackingProgressRepository;
        this.flashcardSetRepository = flashcardSetRepository;
        this.validate = validate;
        this.classRoomRepository = classRoomRepository;
        this.classSetRepository = classSetRepository;
        this.flashcardSetService = flashcardSetService;
        this.classMemberRepository = classMemberRepository;
    }

    @Override
    public void trackingProgress(User user, long setId, long cardId) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        TrackingProgress trackingProgress = trackingProgressRepository.getTrackingProgressByUserAndFlashcardSetAndCardId(user,flashcardSet,cardId) ;
        if(trackingProgress == null ) {
            trackingProgress = new TrackingProgress();
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

    @Override
    public TrackingClassSetSTO trackingProgressClassSet(User user, long classId, long classSetId) {
        ClassRoom classRoom = classRoomRepository.getClassRoomByClassRoomId(classId);
        ClassSet classSet = classSetRepository.getClassSetByClassSetId(classSetId);
        FlashcardSet flashcardSet = classSet.getFlashcardSet();
        validate.checkClassMember(user,classRoom);
        List<ClassMember> classMembers = classMemberRepository.getAllByClassroom(classRoom);
        List<TrackingClassSetSTO.Data> datas = new ArrayList<>();
        for (ClassMember classMember : classMembers){
            TrackingClassSetSTO.Data data = TrackingClassSetSTO.Data.builder()
                    .userId(classMember.getUser().getUserId())
                    .userName(classMember.getUser().getUserName())
                    .email(classMember.getUser().getEmail())
                    .numberLearned(trackingProgressRepository.countByUserAndFlashcardSetAndCreatedAtBefore(classMember.getUser(),flashcardSet,classSet.getDueAt()))
                    .build();
            datas.add(data);
        }

        return TrackingClassSetSTO.builder()
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .title(flashcardSet.getTitle())
                .startDate(classSet.getCreatedAt())
                .dueDate(classSet.getDueAt())
                .numberCards(flashcardSetService.numberCard(flashcardSet.getFlashcardSetId(),flashcardSet.getType()))
                .data(datas)
                .build();
    }
}
