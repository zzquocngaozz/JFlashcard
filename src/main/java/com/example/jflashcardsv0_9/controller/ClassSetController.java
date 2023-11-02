package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.ClassSetDTO;
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

    @GetMapping("/{classId}/set")
    public List<ClassSetDTO> listClassSet(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long classId){
        return classSetService.listClassSet(myUserDetail.getUser(),classId);
    }

}
