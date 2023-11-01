package com.example.jflashcardsv0_9.mapper;

import com.example.jflashcardsv0_9.dto.AuthDTO;
import com.example.jflashcardsv0_9.dto.CommentDTO;
import com.example.jflashcardsv0_9.entities.ClassPost;
import com.example.jflashcardsv0_9.entities.Comment;
import com.example.jflashcardsv0_9.entities.Role;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ClassCommentMapper {

    public static Comment toCommentEntity(CommentDTO commentDTO){
        return Comment.builder()
                .content(commentDTO.getContent())
                .classPost(ClassPost.builder().classPostId(commentDTO.getClassPostId()).build())
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .build();
    }











    public static CommentDTO toCommentDTO(Comment comment){
        List<Integer> teacherRoleIds = comment.getUser().getRoles().stream()
                .map(Role::getRoleId) // Assuming Role has a 'roleId' field for the role ID
                .collect(Collectors.toList());
        Integer roleId = teacherRoleIds.get(0);

        return CommentDTO.builder().commentId(comment.getCommentId())
                .content(comment.getContent())
                .classPostId(comment.getClassPost().getClassPostId())
                .creator(AuthDTO.builder()
                        .userId(comment.getUser().getUserId())
                        .userName(comment.getUser().getUserName())
                        .role(roleId)
                        .build())
                .createdAt(comment.getCreatedAt()).build();
    }
}
