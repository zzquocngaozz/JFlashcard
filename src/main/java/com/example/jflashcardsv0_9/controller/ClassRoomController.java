package com.example.jflashcardsv0_9.controller;
import com.example.jflashcardsv0_9.dto.ClassRoomDTO;
import com.example.jflashcardsv0_9.dto.ClassRoomSingleDTO;
import com.example.jflashcardsv0_9.dto.IdDTO;
import com.example.jflashcardsv0_9.entities.ClassRoom;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.ClassRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    // Read (GET): Lấy danh sách tất cả ClassRooms
    @GetMapping
    public List<ClassRoomDTO> getAllClassRooms(@AuthenticationPrincipal MyUserDetail myUserDetail) {
        return classRoomService.getAllClassrooms(myUserDetail);
    }

    // Read (GET): Lấy thông tin ClassRoom dựa trên ID
    @GetMapping("/{id}")
    public ClassRoomDTO getClassRoomById(@PathVariable Long id, @AuthenticationPrincipal MyUserDetail myUserDetail) {
        System.out.println("cut roi getclassbyid line 38");
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

    // list classroom of user
    // learner
    @GetMapping("/list")
    public List<ClassRoomSingleDTO> getListClassRoomOfUser(@AuthenticationPrincipal MyUserDetail myUserDetail) {
        return classRoomService.getListClassRoomOfUser(myUserDetail.getUser().getUserId());
    }
    // teacher
}
