package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.AuthDTO;
import com.example.jflashcardsv0_9.dto.ClassRoomDTO;
import com.example.jflashcardsv0_9.dto.ClassRoomSingleDTO;
import com.example.jflashcardsv0_9.dto.IdDTO;
import com.example.jflashcardsv0_9.entities.ClassMember;
import com.example.jflashcardsv0_9.entities.ClassRoom;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.exception.AppException;
import com.example.jflashcardsv0_9.exception.Error;
import com.example.jflashcardsv0_9.mapper.ClassroomMapper;
import com.example.jflashcardsv0_9.mapper.FlashcardMapper;
import com.example.jflashcardsv0_9.mapper.UserMapper;
import com.example.jflashcardsv0_9.repository.ClassMemberRepository;
import com.example.jflashcardsv0_9.repository.ClassRoomRepository;
import com.example.jflashcardsv0_9.repository.UserRepository;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.ClassRoomService;
import com.example.jflashcardsv0_9.util.RandomTokenUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ClassRoomServiceImpl implements ClassRoomService {

    @Autowired
    ClassRoomRepository classRoomRepository;

    @Autowired
    ClassMemberRepository classMemberRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public IdDTO createClassroom(ClassRoomDTO classRoomDTO, MyUserDetail myUserDetail) {
        classRoomDTO.setTeacher(AuthDTO.builder().userId(myUserDetail.getUser().getUserId()).build());
        classRoomDTO.setClassRoomCode(RandomTokenUtil.generateToken());
        classRoomDTO.setCreatedAt(new Date(System.currentTimeMillis()));
        System.out.println(classRoomDTO.getClassRoomCode()+" vao day r line 36");
        // chuyen Dto thanh entity va luu vao db
        ClassRoom saveClassroom = classRoomRepository.save(ClassroomMapper.toEntity(classRoomDTO));
        // luu vao classroom member ship
        classMemberRepository.save(
                ClassMember.builder()
                        .classroom(saveClassroom)
                        .user(User.builder().userId(myUserDetail.getUser().getUserId())
                        .build())
                        .build());
        System.out.println(" vao day r line 46");
        return IdDTO.builder().id(saveClassroom.getClassRoomId()).build();
    }

    @Override
    public List<ClassRoomDTO> getAllClassrooms(MyUserDetail myUserDetail) {
        return null;
    }

    @Override
    public ClassRoomSingleDTO getClassroomById(Long id, MyUserDetail myUserDetail) {
        Optional<ClassRoom> classRoom = classRoomRepository.findById(id);
        if(classRoom.isEmpty())
            throw new AppException(Error.CLASSROOM_NOT_FOUND);
        if(!classMemberRepository.existsClassMemberByClassroomAndUser(classRoom.get(),myUserDetail.getUser()))
            throw new AppException(Error.AUTH_GI_DO);

        return ClassroomMapper.convertClasRoomToClassRoomSingleDTO(classRoom.get());
    }

    @Override
    public ClassRoomDTO updateClassroom(ClassRoomDTO updatedClassroom, MyUserDetail myUserDetail) {
        System.out.println(updatedClassroom);
        // TODO: tao exception cho khong tim thay class va chan quyen sua thong tin lop
        Optional<ClassRoom> classRoom = classRoomRepository.findById(updatedClassroom.getClassRoomId());
        if(classRoom.isEmpty())
            throw new AppException(Error.CLASSROOM_NOT_FOUND);
        if(classRoom.get().getTeacher().getUserId()!=myUserDetail.getUser().getUserId())
            throw new AppException(Error.AUTH_GI_DO);
        ClassRoom classUpdate = classRoom.get();
        classUpdate.setClassRoomName(updatedClassroom.getClassRoomName());
        classUpdate.setDescription(updatedClassroom.getDescription());
        ClassRoom savedClass = classRoomRepository.save(classUpdate);
        return ClassroomMapper.toDto(savedClass);
    }


    @Override
    public List<ClassRoomSingleDTO> getListClassRoomOfUser(long userId) {
        User user = userRepository.getUserByUserId(userId);
        List<ClassMember> classMembers = classMemberRepository.findAllByUser(user);
        List<ClassRoom> classrooms = new ArrayList<>();
        for (ClassMember member : classMembers) {
            classrooms.add(classRoomRepository.getClassRoomByClassRoomId(member.getClassroom().getClassRoomId()));
        }
        return classrooms.stream()
                .map((ClassRoom classRoom) -> ClassroomMapper.convertClasRoomToClassRoomSingleDTO(classRoom))
                .collect(Collectors.toList());
    }
    public void deleteClassroom(Long id, MyUserDetail myUserDetail) {
        Optional<ClassRoom> classRoom = classRoomRepository.findById(id);
        if(classRoom.isEmpty())
            throw new AppException(Error.USER_BLOCK);
        if(classRoom.get().getTeacher().getUserId()!=myUserDetail.getUser().getUserId())
            throw new AppException(Error.USER_BLOCK);
        ClassRoom classRoom1 = classRoom.get();
        System.out.println("printed )" +classRoom1.toString());
        classRoomRepository.delete(classRoom1);
    }

    @Override
    public IdDTO joinClassRoom(long userId, String classCode) {
        Optional<ClassRoom> classRoom = classRoomRepository.findByClassRoomCode(classCode);
        if(classRoom.isEmpty())
            throw new AppException(Error.CLASSROOM_NOT_FOUND);
        ClassMember classMember = new ClassMember();
        classMember.setClassroom(classRoom.get());
        classMember.setUser(User.builder().userId(userId).build());
        classMemberRepository.save(classMember);
        return IdDTO.builder().id(classRoom.get().getClassRoomId()).build();
    }

    @Override
    public void deleteClassMember(long auth, long userId, long  classCodeId) {
        ClassMember classMember = classMemberRepository.getClassMemberByClassroomAndUser(classRoomRepository.getClassRoomByClassRoomId(classCodeId),userRepository.getUserByUserId(userId));
        classMemberRepository.delete(classMember);
    }

    @Override
    public List<AuthDTO> getAllClassMembersByClassRoom(long classRoomId) {
        ClassRoom classRoom = classRoomRepository.getClassRoomByClassRoomId(classRoomId);
        List<ClassMember> classMembers = classMemberRepository.getAllByClassroom(classRoom);
//        classrooms.stream()
//                .map((ClassRoom classRoom) -> ClassroomMapper.convertClasRoomToClassRoomSingleDTO(classRoom))
//                .collect(Collectors.toList());
        return classMembers.stream()
                .map((classMember -> UserMapper.toAuthDTO(classMember.getUser())))
                .collect(Collectors.toList());
    }
}
