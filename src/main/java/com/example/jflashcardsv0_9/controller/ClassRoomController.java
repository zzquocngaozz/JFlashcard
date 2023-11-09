package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.AuthDTO;
import com.example.jflashcardsv0_9.dto.ClassRoomDTO;
import com.example.jflashcardsv0_9.dto.ClassRoomSingleDTO;
import com.example.jflashcardsv0_9.dto.IdDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.ClassRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/classroom")
public class ClassRoomController {
    @Autowired
    private ClassRoomService classRoomService;

    // Create (POST): Tạo một ClassRoom mới
    @PostMapping
    public IdDTO createClassRoom(@RequestBody ClassRoomDTO classRoomDTO, @AuthenticationPrincipal MyUserDetail myUserDetail) {
        return classRoomService.createClassroom(classRoomDTO, myUserDetail);
    }

    // Read (GET): Lấy thông tin ClassRoom dựa trên ID
    @GetMapping("/{id}")
    public ClassRoomSingleDTO getClassRoomById(@PathVariable Long id, @AuthenticationPrincipal MyUserDetail myUserDetail) {
        return classRoomService.getClassroomById(id, myUserDetail);
    }

    // Update (PUT): Cập nhật thông tin ClassRoom
    @PutMapping("/{id}")
    public ClassRoomDTO updateClassRoom(@PathVariable Long id, @RequestBody ClassRoomDTO classRoomDTO,@AuthenticationPrincipal MyUserDetail myUserDetail) {
        classRoomDTO.setClassRoomId(id);
        return classRoomService.updateClassroom( classRoomDTO, myUserDetail);
    }

    // Delete (DELETE): Xóa ClassRoom dựa trên ID

    @DeleteMapping("/{id}")
    public void deleteClassRoom(@PathVariable Long id, @AuthenticationPrincipal MyUserDetail myUserDetail) {
        classRoomService.deleteClassroom(id, myUserDetail);
    }

    @PostMapping("/joinclass")
    public IdDTO joinClassRoom(@AuthenticationPrincipal MyUserDetail myUserDetail, @RequestBody ClassRoomDTO classRoomDTO){
        return  classRoomService.joinClassRoom(myUserDetail.getUser().getUserId(),classRoomDTO.getClassRoomCode());
    }


    @DeleteMapping("/{classId}/deleteMember/{userId}")
    public ResponseEntity<?> deleteMember(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long classId,@PathVariable long userId){
        classRoomService.deleteClassMember(myUserDetail.getUser().getUserId(),userId,classId);
        return  ResponseEntity.ok("xoa thanh cong");
    }

    @GetMapping("/{classId}/listMemBer")
    public List<AuthDTO> listMembers(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long classId) {

        return classRoomService.getAllClassMembersByClassRoom(classId);
    }


    // list classroom of user
    // learner
    @GetMapping("/list")
    public List<ClassRoomSingleDTO> getListClassRoomOfUser(@AuthenticationPrincipal MyUserDetail myUserDetail) {
        return classRoomService.getListClassRoomOfUser(myUserDetail.getUser().getUserId());
    }
    // teacher
}
