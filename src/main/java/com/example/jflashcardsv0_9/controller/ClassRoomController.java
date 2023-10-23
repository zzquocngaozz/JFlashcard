package com.example.jflashcardsv0_9.controller;
import com.example.jflashcardsv0_9.dto.ClassRoomDTO;
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
    private ClassRoomService classroomService;

    // Create (POST): Tạo một ClassRoom mới
    @PostMapping
    public IdDTO createClassRoom(@RequestBody ClassRoomDTO classRoomDTO, @AuthenticationPrincipal MyUserDetail myUserDetail) {
        System.out.println(myUserDetail.getUser().getUserId());
        System.out.println("cut r");
        return classroomService.createClassroom(classRoomDTO, myUserDetail);
    }

    // Read (GET): Lấy danh sách tất cả ClassRooms
    @GetMapping
    public List<ClassRoomDTO> getAllClassRooms(@AuthenticationPrincipal MyUserDetail myUserDetail) {
        return classroomService.getAllClassrooms(myUserDetail);
    }

    // Read (GET): Lấy thông tin ClassRoom dựa trên ID
    @GetMapping("/{id}")
    public ClassRoomDTO getClassRoomById(@PathVariable Long id, @AuthenticationPrincipal MyUserDetail myUserDetail) {
        System.out.println("cut roi getclassbyid line 38");
        return classroomService.getClassroomById(id, myUserDetail);
    }

    // Update (PUT): Cập nhật thông tin ClassRoom
    @PutMapping("/{id}")
    public ClassRoomDTO updateClassRoom(@PathVariable Long id, @RequestBody ClassRoomDTO classRoomDTO,@AuthenticationPrincipal MyUserDetail myUserDetail) {

        classRoomDTO.setClassRoomId(id);
        return classroomService.updateClassroom( classRoomDTO, myUserDetail);
    }

    // Delete (DELETE): Xóa ClassRoom dựa trên ID
    @DeleteMapping("/{id}")
    public void deleteClassRoom(@PathVariable Long id, @AuthenticationPrincipal MyUserDetail myUserDetail) {
        classroomService.deleteClassroom(id, myUserDetail);
    }
}
