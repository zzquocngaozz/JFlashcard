package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.entities.ClassRoom;
import com.example.jflashcardsv0_9.entities.ClassSet;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.exception.Validate;
import com.example.jflashcardsv0_9.repository.ClassRoomRepository;
import com.example.jflashcardsv0_9.repository.ClassSetRepository;
import com.example.jflashcardsv0_9.service.ClassSetService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ClassSetServiceImpl implements ClassSetService {
    ClassRoomRepository classRoomRepository;
    ClassSetRepository classSetRepository;
    Validate validate;
    @Autowired
    public ClassSetServiceImpl(ClassRoomRepository classRoomRepository, ClassSetRepository classSetRepository, Validate validate) {
        this.classRoomRepository = classRoomRepository;
        this.classSetRepository = classSetRepository;
        this.validate = validate;
    }

    @Override
    public void listClassSet(User user, long classId) {
        ClassRoom classRoom = classRoomRepository.getClassRoomByClassRoomId(classId);
        validate.checkClassMember(user,classRoom);
        List<ClassSet> classSets = classSetRepository.findAllByClassRoom(classRoom);

    }
}
