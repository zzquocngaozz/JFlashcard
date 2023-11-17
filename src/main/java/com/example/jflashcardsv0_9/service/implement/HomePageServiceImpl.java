package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.*;
import com.example.jflashcardsv0_9.mapper.ClassroomMapper;
import com.example.jflashcardsv0_9.mapper.FlashcardMapper;
import com.example.jflashcardsv0_9.repository.*;
import com.example.jflashcardsv0_9.service.HomePageService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HomePageServiceImpl implements HomePageService {
    ClassMemberRepository classMemberRepository;
    OpenedFlashcardSetRepository openedFlashcardSetRepository;
    FlashcardSetRepository flashcardSetRepository;
    ClassRoomRepository classRoomRepository;
    UserRepository userRepository;
    TrackingProgressRepository trackingProgressRepository;
    @Autowired

    public HomePageServiceImpl(ClassMemberRepository classMemberRepository, OpenedFlashcardSetRepository openedFlashcardSetRepository, FlashcardSetRepository flashcardSetRepository, ClassRoomRepository classRoomRepository, UserRepository userRepository, TrackingProgressRepository trackingProgressRepository) {
        this.classMemberRepository = classMemberRepository;
        this.openedFlashcardSetRepository = openedFlashcardSetRepository;
        this.flashcardSetRepository = flashcardSetRepository;
        this.classRoomRepository = classRoomRepository;
        this.userRepository = userRepository;
        this.trackingProgressRepository = trackingProgressRepository;
    }

    @Override
    public HomePageDTO homePage(User user) {
        Pageable pageable = PageRequest.of(0, 3);
        List<ClassRoom> classrooms = classMemberRepository.findTop3NewestClassroomsByUser(user,pageable);
        List<ClassRoomSingleDTO> classRoomSingleDTOS = classrooms.stream()
                .map((ClassRoom classRoom) -> ClassroomMapper.convertClasRoomToClassRoomSingleDTO(classRoom))
                .collect(Collectors.toList());
        List<OpenedFlashcardSet> openedFlashcardSets = openedFlashcardSetRepository.findTop3ByUserOrderByOpenedAtDesc(user,pageable);
        List<FlashcardSet> flashcardSets = new ArrayList<>();
        for (OpenedFlashcardSet openedFlashcardSet : openedFlashcardSets){
            flashcardSets.add(openedFlashcardSet.getFlashcardSet());
        }
        return HomePageDTO.builder()
                .flashcardSets(flashcardSets.stream()
                        .map(FlashcardMapper::convertSetSingleDTO)
                        .collect(Collectors.toList()))
                .classRooms(classRoomSingleDTOS)
                .build();

    }

    @Override
    public DashBoardDTO dashboard() {
        List<Long> numberFLCard = IntStream.rangeClosed(1, 3)
                .mapToObj(type -> flashcardSetRepository.getTotalSetByTypeOrdered((long) type))
                .collect(Collectors.toList());
        List<Long> numberUser = userRepository.countUsersByMultipleRoles();
        return DashBoardDTO.builder()
                .numberUser(numberUser)
                .numberFLCard(numberFLCard)
                .numberClass(classRoomRepository.count())
                .build();
    }

    @Override
    public WeekTrackingDTOResponse chartDashboard(WeekTrackingDTO weekTrackingDTO) {
        LocalDate today = LocalDate.now();
        // Lấy ngày đầu tiên của tuần
        LocalDate firstDayOfWeek = weekTrackingDTO.getStartDate().toLocalDate();
        if(firstDayOfWeek == null){
            firstDayOfWeek = today.with(DayOfWeek.MONDAY);
        }
        LocalDate lastDayOfWeek = weekTrackingDTO.getEndDate().toLocalDate();
        if(lastDayOfWeek == null){
            lastDayOfWeek = today.with(DayOfWeek.SUNDAY);
        }
        // Lấy ngày cuối cùng của tuần
        List<LocalDate> dateRange = getDateRange(firstDayOfWeek,lastDayOfWeek);
        List<Long> dataWeek = new ArrayList<>();
        for (LocalDate date : dateRange) {
            List<Long> dailyData = trackingProgressRepository.countDistinctFlashcardSetsByDate(Date.valueOf(date));
            dataWeek.addAll(dailyData);
        }
        return WeekTrackingDTOResponse.builder()
                .startDate( Date.valueOf(firstDayOfWeek))
                .endDate(Date.valueOf(lastDayOfWeek))
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
