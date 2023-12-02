package com.example.jflashcardsv0_9.mapper;

import com.example.jflashcardsv0_9.dto.AuthDTO;
import com.example.jflashcardsv0_9.dto.ClassPostDTO;
import com.example.jflashcardsv0_9.entities.ClassPost;
import com.example.jflashcardsv0_9.entities.ClassRoom;
import com.example.jflashcardsv0_9.entities.Role;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ClassPostMapper {

    public static ClassPost toClassPostEntity(ClassPostDTO classPostDTO ){
        return ClassPost.builder()
                .content(classPostDTO.getContent())
                .classroom(ClassRoom.builder().classRoomId(classPostDTO.getClassRoomId()).build())
//                .user(User.builder().userId(classPostDTO.getCreator().getUserId()).build())
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .build();
    }




    public static ClassPostDTO toClassPostDTO(ClassPost classPost){
        List<Integer> teacherRoleIds = classPost.getUser().getRoles().stream()
                .map(Role::getRoleId) // Assuming Role has a 'roleId' field for the role ID
                .collect(Collectors.toList());
        Integer roleId = teacherRoleIds.get(0);

        return ClassPostDTO.builder()
                .classPostId(classPost.getClassPostId())
                .content(classPost.getContent())
                .classRoomId(classPost.getClassroom().getClassRoomId())
                .comments(classPost.getCommentList()
                        .stream().map(comment -> ClassCommentMapper.toCommentDTO(comment))
                        .collect(Collectors.toList()))
                .creator(AuthDTO.builder()
                        .userId(classPost.getUser().getUserId())
                        .userName(classPost.getUser().getUserName())
                        .role(roleId)
                        .build())
                .createdAt(classPost.getCreatedAt()).build();
    }
}

