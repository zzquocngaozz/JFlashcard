package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.ClassSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/classroom")
public class ClassSetController {
    @Autowired
    private ClassSetService classSetService;

    @GetMapping("/{classId}/set")
    public ResponseEntity<?> listClassSet(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long classId){
        classSetService.listClassSet(myUserDetail.getUser(),classId);
        return ResponseEntity.ok("list classset");
    }
}
