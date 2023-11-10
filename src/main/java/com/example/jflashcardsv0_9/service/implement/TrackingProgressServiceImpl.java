package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.TrackingClassSetSTO;
import com.example.jflashcardsv0_9.dto.TrackingDTOResponse;
import com.example.jflashcardsv0_9.entities.*;
import com.example.jflashcardsv0_9.exception.AppException;
import com.example.jflashcardsv0_9.exception.Error;
import com.example.jflashcardsv0_9.exception.Validate;
import com.example.jflashcardsv0_9.repository.*;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import com.example.jflashcardsv0_9.service.SendEmailService;
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
    SendEmailService sendEmailService;
    @Autowired
    public TrackingProgressServiceImpl(TrackingProgressRepository trackingProgressRepository, FlashcardSetRepository flashcardSetRepository, Validate validate, ClassRoomRepository classRoomRepository, ClassSetRepository classSetRepository, FlashcardSetService flashcardSetService, ClassMemberRepository classMemberRepository, SendEmailService sendEmailService) {
        this.trackingProgressRepository = trackingProgressRepository;
        this.flashcardSetRepository = flashcardSetRepository;
        this.validate = validate;
        this.classRoomRepository = classRoomRepository;
        this.classSetRepository = classSetRepository;
        this.flashcardSetService = flashcardSetService;
        this.classMemberRepository = classMemberRepository;
        this.sendEmailService = sendEmailService;
    }

    @Override
    public void trackingProgress(User user, long setId, long cardId) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        TrackingProgress trackingProgress = new TrackingProgress();
            trackingProgress = new TrackingProgress();
            trackingProgress.setUser(user);
            trackingProgress.setFlashcardSet(flashcardSet);
            trackingProgress.setCardId(cardId);
            trackingProgress.setTimeLearn(new Timestamp(System.currentTimeMillis()));
        trackingProgressRepository.save(trackingProgress);

    }

    @Override
    public TrackingClassSetSTO trackingProgressClassSet(User user, long classId, long classSetId) {
        ClassRoom classRoom = classRoomRepository.getClassRoomByClassRoomId(classId);
        ClassSet classSet = classSetRepository.getClassSetByClassSetId(classSetId);
        FlashcardSet flashcardSet = classSet.getFlashcardSet();
        validate.checkClassMember(user, classRoom);
        List<ClassMember> classMembers = classMemberRepository.getAllByClassroom(classRoom);
        classMembers.removeIf(classMember -> classMember.getUser().getUserId().equals(classRoom.getTeacher().getUserId()));
        List<TrackingClassSetSTO.Data> datas = new ArrayList<>();
        for (ClassMember classMember : classMembers) {
            TrackingClassSetSTO.Data data = TrackingClassSetSTO.Data.builder()
                    .userId(classMember.getUser().getUserId())
                    .userName(classMember.getUser().getUserName())
                    .email(classMember.getUser().getEmail())
                    .numberLearned(trackingProgressRepository.countByUserAndFlashcardSetAndTimeLearnBetween(
                            classMember.getUser(), flashcardSet, classSet.getCreatedAt(), classSet.getDueAt()))
                    .build();
            datas.add(data);
        }

        return TrackingClassSetSTO.builder()
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .title(flashcardSet.getTitle())
                .startDate(classSet.getCreatedAt())
                .dueDate(classSet.getDueAt())
                .numberCards(flashcardSetService.numberCard(flashcardSet.getFlashcardSetId(), flashcardSet.getType()))
                .data(datas)
                .build();
    }

    @Override
    public void sendMailTracking(TrackingDTOResponse trackingDTOResponse) {
        if(trackingDTOResponse == null){
            throw new AppException(Error.INFO_NOT_FOUND);
        }
        ClassRoom classRoom = classRoomRepository.getClassRoomByClassRoomId(trackingDTOResponse.getClassId());
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(trackingDTOResponse.getSetId());
        List<TrackingDTOResponse.Data> onTrackingUsers = trackingDTOResponse.getOnTracking();
        List<TrackingDTOResponse.Data> behinds = trackingDTOResponse.getBehind();
        List<TrackingDTOResponse.Data> lazys = trackingDTOResponse.getLazy();
        if(!(onTrackingUsers == null)){
        for (TrackingDTOResponse.Data user : onTrackingUsers) {
            // Truy xuất thông tin người dùng trong trạng thái "onTracking"
            sendEmailService.sendOnTrackEmail(user.getEmail(),user.getUserName(),flashcardSet.getTitle(),classRoom.getClassRoomName());
            // Sử dụng thông tin người dùng để send mail
        }}
        if(!(behinds == null)){
        for (TrackingDTOResponse.Data user : behinds) {
            // Truy xuất thông tin người dùng trong trạng thái "onTracking"
            sendEmailService.sendBehindScheduleEmail(user.getEmail(),user.getUserName(),flashcardSet.getTitle(),classRoom.getClassRoomName());
            // Sử dụng thông tin người dùng để send mail
        }}
        if(!(lazys == null)){
        for (TrackingDTOResponse.Data user : lazys) {
            // Truy xuất thông tin người dùng trong trạng thái "onTracking"
            sendEmailService.sendLazyEmail(user.getEmail(),user.getUserName(),flashcardSet.getTitle(),classRoom.getClassRoomName());
            // Sử dụng thông tin người dùng để send mail
        }}

    }
}
