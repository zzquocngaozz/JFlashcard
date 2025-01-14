package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.TrackingClassSetSTO;
import com.example.jflashcardsv0_9.dto.TrackingDTOResponse;
import com.example.jflashcardsv0_9.dto.WeekTrackingDTO;
import com.example.jflashcardsv0_9.dto.WeekTrackingDTOResponse;
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
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TrackingProgressServiceImpl implements TrackingProgressService {
    TrackingProgressRepository trackingProgressRepository;
    FlashcardSetRepository flashcardSetRepository;
    FlashcardKanjiRepository flashcardKanjiRepository;
    FlashcardVocabRepository flashcardVocabRepository;
    FlashcardGrammarRepository flashcardGrammarRepository;
    UserRepository userRepository;
    Validate validate;
    ClassRoomRepository classRoomRepository;
    ClassSetRepository classSetRepository;
    FlashcardSetService flashcardSetService;
    ClassMemberRepository classMemberRepository;
    SendEmailService sendEmailService;
    @Autowired
    public TrackingProgressServiceImpl(TrackingProgressRepository trackingProgressRepository, FlashcardSetRepository flashcardSetRepository, FlashcardKanjiRepository flashcardKanjiRepository, FlashcardVocabRepository flashcardVocabRepository, FlashcardGrammarRepository flashcardGrammarRepository, UserRepository userRepository, Validate validate, ClassRoomRepository classRoomRepository, ClassSetRepository classSetRepository, FlashcardSetService flashcardSetService, ClassMemberRepository classMemberRepository, SendEmailService sendEmailService) {
        this.trackingProgressRepository = trackingProgressRepository;
        this.flashcardSetRepository = flashcardSetRepository;
        this.flashcardKanjiRepository = flashcardKanjiRepository;
        this.flashcardVocabRepository = flashcardVocabRepository;
        this.flashcardGrammarRepository = flashcardGrammarRepository;
        this.userRepository = userRepository;
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
            List<Long> longs = trackingProgressRepository.findDistinctCardIdsByUserAndFlashcardSetAndTimeLearnBetween(classMember.getUser(), flashcardSet, classSet.getCreatedAt(), classSet.getDueAt());
            long count = getCountByFlashcardSetType(flashcardSet.getType(), longs);
            TrackingClassSetSTO.Data data = TrackingClassSetSTO.Data.builder()
                    .userId(classMember.getUser().getUserId())
                    .userName(classMember.getUser().getUserName())
                    .email(classMember.getUser().getEmail())
                    .numberLearned(count)
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

    public long getCountByFlashcardSetType(int type, List<Long> longs) {
        return longs.stream()
                .filter(card -> getStatus(type, card) == 3)
                .count();
    }

    private int getStatus(int type, Long card) {
        switch (type) {
            case 1:
                return flashcardKanjiRepository.getFlashcardKanjiByCardKanjiIdAndStatus(card, 3) != null ? 3 : 0;
            case 2:
                return flashcardVocabRepository.getFlashcardVocabByCardVocabIdAndStatus(card, 3) != null ? 3 : 0;
            case 3:
                return flashcardGrammarRepository.getFlashcardGrammarByCardGrammarIdAndStatus(card, 3) != null ? 3 : 0;
            default:
                return 0;
        }
    }

//    @Override
//    public void sendMailTracking(TrackingDTOResponse trackingDTOResponse) {
//        if(trackingDTOResponse == null){
//            throw new AppException(Error.INFO_NOT_FOUND);
//        }
//        ClassRoom classRoom = classRoomRepository.getClassRoomByClassRoomId(trackingDTOResponse.getClassId());
//        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(trackingDTOResponse.getSetId());
//        List<TrackingDTOResponse.Data> onTrackingUsers = trackingDTOResponse.getOnTracking();
//        List<TrackingDTOResponse.Data> behinds = trackingDTOResponse.getBehind();
//        List<TrackingDTOResponse.Data> lazys = trackingDTOResponse.getLazy();
//        if(!(onTrackingUsers == null)){
//        for (TrackingDTOResponse.Data user : onTrackingUsers) {
//            // Truy xuất thông tin người dùng trong trạng thái "onTracking"
//            sendEmailService.sendOnTrackEmail(user.getEmail(),user.getUserName(),flashcardSet.getTitle(),classRoom.getClassRoomName());
//            // Sử dụng thông tin người dùng để send mail
//        }}
//        if(!(behinds == null)){
//        for (TrackingDTOResponse.Data user : behinds) {
//            // Truy xuất thông tin người dùng trong trạng thái "onTracking"
//            sendEmailService.sendBehindScheduleEmail(user.getEmail(),user.getUserName(),flashcardSet.getTitle(),classRoom.getClassRoomName());
//            // Sử dụng thông tin người dùng để send mail
//        }}
//        if(!(lazys == null)){
//        for (TrackingDTOResponse.Data user : lazys) {
//            // Truy xuất thông tin người dùng trong trạng thái "onTracking"
//            sendEmailService.sendLazyEmail(user.getEmail(),user.getUserName(),flashcardSet.getTitle(),classRoom.getClassRoomName());
//            // Sử dụng thông tin người dùng để send mail
//        }}
//

    @Override
    public void sendMailTracking(TrackingDTOResponse trackingDTOResponse) {
        if(trackingDTOResponse == null){
            throw new AppException(Error.INFO_NOT_FOUND);
        }
        ClassRoom classRoom = classRoomRepository.getClassRoomByClassRoomId(trackingDTOResponse.getClassId());
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(trackingDTOResponse.getSetId());
        List<TrackingDTOResponse.Data> allUsers = new ArrayList<>();

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


    @Override
    public WeekTrackingDTOResponse weekTrackingClassSet(WeekTrackingDTO dto) {
        User user = userRepository.getUserByUserId(dto.getUserId());

        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(dto.getFlashcardSetId());
        Optional<TrackingProgress> oldestTrackingProgress = trackingProgressRepository.findTopByUserAndFlashcardSetOrderByTimeLearnAsc(user, flashcardSet);
        Optional<TrackingProgress> latestTrackingProgress = trackingProgressRepository.findTopByUserAndFlashcardSetOrderByTimeLearnDesc(user, flashcardSet);
        List<LocalDate> dateRange = getDateRange(dto.getStartDate().toLocalDate(), dto.getEndDate().toLocalDate());
        List<Long> dataWeek = new ArrayList<>();
        for (LocalDate date : dateRange) {
            List<Long> dailyData = trackingProgressRepository.getTotalCardsByDayClassSet(Date.valueOf(date), user,flashcardSet);
            dataWeek.addAll(dailyData);
        }
        return WeekTrackingDTOResponse.builder()
                .startDate(oldestTrackingProgress.get().getTimeLearn())
                .endDate(latestTrackingProgress.get().getTimeLearn())
                .data(dataWeek)
                .build();
    }
    public List<LocalDate> getDateRange(LocalDate startDate, LocalDate endDate) {
        List<LocalDate> dateRange = new ArrayList<>();
        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            dateRange.add(currentDate);
            currentDate = currentDate.plusDays(1);
        }

        return dateRange;
    }
}
