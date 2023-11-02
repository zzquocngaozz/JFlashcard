package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.ClassPostDTO;
import com.example.jflashcardsv0_9.dto.ClassRoomDTO;
import com.example.jflashcardsv0_9.dto.CommentDTO;
import com.example.jflashcardsv0_9.dto.IdDTO;
import com.example.jflashcardsv0_9.entities.ClassPost;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.ClassPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/classroom")
public class ClassPostController {

    private final ClassPostService classPostService;

    @Autowired
    public ClassPostController(ClassPostService classPostService) {
        this.classPostService = classPostService;
    }

    @PostMapping("/{classRoomId}/class-post")
    public ClassPostDTO createClassPost(@PathVariable Long classRoomId,@RequestBody ClassPostDTO classPostDTO, @AuthenticationPrincipal MyUserDetail myUserDetail) {
        classPostDTO.setClassRoomId(classRoomId);
        return classPostService.createClassPost(classPostDTO, myUserDetail);
    }

    @GetMapping("/{classRoomId}/class-post")
    public List<ClassPostDTO> getAllClassPosts(@PathVariable Long classRoomId,@AuthenticationPrincipal MyUserDetail myUserDetail) {

        return classPostService.getClassPostsByClassroomId(classRoomId);
    }


    @PutMapping("/{classRoomId}/class-post")
    public ResponseEntity<Void> updateClassPost( @RequestBody ClassPostDTO classPostDTO, @AuthenticationPrincipal MyUserDetail myUserDetail) {

        classPostService.updateClassPost(classPostDTO, myUserDetail);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{classRoomId}/class-post/{classPostId}")
    public ResponseEntity<?> deleteClassPost(@PathVariable Long classPostId, @AuthenticationPrincipal MyUserDetail myUserDetail) {
        classPostService.deleteClassPost(classPostId, myUserDetail);
        return ResponseEntity.ok("Xóa thành công");
    }
    @PostMapping("/{classRoomId}/class-post/{classPostId}")
    public CommentDTO createComment(@PathVariable Long classPostId,@RequestBody CommentDTO commentDTO,@AuthenticationPrincipal MyUserDetail myUserDetail){
        commentDTO.setClassPostId(classPostId);
        return classPostService.createComment(commentDTO,myUserDetail);
    }
    @DeleteMapping("/{classRoomId}/class-post/{classPostId}/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId,@AuthenticationPrincipal MyUserDetail myUserDetail){
        classPostService.deleteComment(commentId,myUserDetail);
        return ResponseEntity.ok("Delete comment");
    }

}
