package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.AuthDTO;
import com.example.jflashcardsv0_9.dto.ClassPostDTO;
import com.example.jflashcardsv0_9.dto.CommentDTO;
import com.example.jflashcardsv0_9.dto.IdDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;

import java.util.List;

public interface ClassPostService {
    ClassPostDTO createClassPost(ClassPostDTO classPostDTO, MyUserDetail myUserDetail);
    List<ClassPostDTO> getClassPostsByClassroomId(Long classRoomId);

    void updateClassPost(ClassPostDTO classPostDTO, MyUserDetail myUserDetail);
    void deleteClassPost(long classPostId, MyUserDetail myUserDetail);

    CommentDTO createComment(CommentDTO commentDTO,MyUserDetail myUserDetail);

    void deleteComment(long commentId,MyUserDetail myUserDetail);

}
