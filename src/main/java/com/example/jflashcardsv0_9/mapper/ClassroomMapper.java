package com.example.jflashcardsv0_9.mapper;

import com.example.jflashcardsv0_9.dto.AuthDTO;
import com.example.jflashcardsv0_9.dto.ClassRoomDTO;
import com.example.jflashcardsv0_9.dto.ClassRoomSingleDTO;
import com.example.jflashcardsv0_9.entities.ClassRoom;
import com.example.jflashcardsv0_9.entities.Role;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.repository.ClassMemberRepository;
import com.example.jflashcardsv0_9.repository.ClassSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ClassroomMapper {
//    static RoleService roleService;
//
//    @Autowired
//    public ClassroomMapper(RoleService roleService) {
//        this.roleService = roleService;
//    }
    static ClassMemberRepository classMemberRepository;
    static ClassSetRepository classSetRepository;
    @Autowired
    public ClassroomMapper(ClassMemberRepository classMemberRepository,ClassSetRepository classSetRepository) {
        this.classMemberRepository = classMemberRepository;
        this.classSetRepository = classSetRepository;
    }

    public static ClassRoom toEntity(ClassRoomDTO classRoomDTO) {
        return ClassRoom.builder()
                .classRoomId(classRoomDTO.getClassRoomId())
                .classRoomName(classRoomDTO.getClassRoomName())
                .classRoomCode(classRoomDTO.getClassRoomCode())
                .description(classRoomDTO.getDescription())
                .createdAt((Date) classRoomDTO.getCreatedAt())
                .teacher(User.builder().userId(classRoomDTO.getTeacher().getUserId()).build())
                .build();
    }



    public static ClassRoomDTO toDto(ClassRoom classRoom) {
        List<Integer> teacherRoleIds = classRoom.getTeacher().getRoles().stream()
                .map(Role::getRoleId) // Assuming Role has a 'roleId' field for the role ID
                .collect(Collectors.toList());
        Integer roleId = teacherRoleIds.get(0);
        System.out.println();

        return ClassRoomDTO.builder()
                .classRoomId(classRoom.getClassRoomId())
                .classRoomName(classRoom.getClassRoomName())
                .classRoomCode(classRoom.getClassRoomCode())
                .description(classRoom.getDescription())
                .createdAt(classRoom.getCreatedAt())
                .teacher(AuthDTO.builder().userId(classRoom.getTeacher().getUserId())
                        .userName(classRoom.getTeacher().getUserName())
                        .role(roleId).build())
                .build();
    }

    public static ClassRoomSingleDTO convertClasRoomToClassRoomSingleDTO(ClassRoom classRoom) {
        return ClassRoomSingleDTO.builder()
                .classRoomId(classRoom.getClassRoomId())
                .classRoomName(classRoom.getClassRoomName())
                .classRoomCode(classRoom.getClassRoomCode())
                .description(classRoom.getDescription())
                .createdAt(classRoom.getCreatedAt())
                .numberMember(classMemberRepository.findAllByClassroom(classRoom).size())
                .numberSet(classSetRepository.findAllByClassRoom(classRoom).size())
                .teacher(UserMapper.toAuthDTO(classRoom.getTeacher()))
                .build();
    }
}
