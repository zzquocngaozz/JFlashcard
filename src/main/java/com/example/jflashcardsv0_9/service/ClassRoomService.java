package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.AuthDTO;
import com.example.jflashcardsv0_9.dto.ClassRoomDTO;
import com.example.jflashcardsv0_9.dto.ClassRoomSingleDTO;
import com.example.jflashcardsv0_9.dto.IdDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ClassRoomService {

        IdDTO createClassroom(ClassRoomDTO classRoomDTO, MyUserDetail myUserDetail);

        List<ClassRoomDTO> getAllClassrooms(MyUserDetail myUserDetail);

        ClassRoomSingleDTO getClassroomById(Long id, MyUserDetail myUserDetail);

        ClassRoomDTO updateClassroom(ClassRoomDTO updatedClassroom, MyUserDetail myUserDetail);

        void deleteClassroom(Long id, MyUserDetail myUserDetail);
        List<ClassRoomSingleDTO> getListClassRoomOfUser(long userId);

        IdDTO joinClassRoom(long userId,String classCode);

        void deleteClassMember(long auth, long userId, long classRoomId);

        List<AuthDTO> getAllClassMembersByClassRoom (long classRoomId);
}
