package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.ClassSetDTO;
import com.example.jflashcardsv0_9.dto.SetSingleDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.ClassSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/classroom")
public class ClassSetController {
    @Autowired
    private ClassSetService classSetService;
  // list các class set trong lớp học
    @GetMapping("/{classId}/set/list")
    public List<ClassSetDTO> listClassSet(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long classId){
        return classSetService.listClassSet(myUserDetail.getUser(),classId);
    }
    //list set cua giáp viên để add vào class set
    @GetMapping("{classId}/set/listset")
    public List<SetSingleDTO> listSetOfUserInClass(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long classId){
        return classSetService.listSetOfUserInClass(myUserDetail.getUser(),classId);
    }
    // add class set
    @PostMapping("{classId}/set/add")
    public ResponseEntity<?> addSetOfUserInClass(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody ClassSetDTO classSetDTO){
        classSetService.addSetOfUserInClass(myUserDetail.getUser(),classSetDTO);
        return ResponseEntity.ok("add set thanh cong");
    }
    //update lại due
    @PutMapping("{classId}/set/update")
    public ResponseEntity<?> updateSetOfUserInClass(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody ClassSetDTO classSetDTO){
        classSetService.updateSetOfUserInClass(myUserDetail.getUser(),classSetDTO);
        return ResponseEntity.ok("update set thanh cong");
    }
    @DeleteMapping("{classId}/set/delete/{classSetID}")
    public ResponseEntity<?> deleteSetOfUserInClass(@AuthenticationPrincipal MyUserDetail myUserDetail,@PathVariable long classId, @PathVariable long classSetID) {
        classSetService.deleteSetOfUserInClass(myUserDetail.getUser(), classId, classSetID);
        return ResponseEntity.ok("delete set thanh cong");
    }

}
