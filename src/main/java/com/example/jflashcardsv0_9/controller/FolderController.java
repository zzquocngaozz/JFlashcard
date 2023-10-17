package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/createfolder")
public class FolderController {
    @Autowired
    private FolderService folderService;

    @PostMapping
    public ResponseEntity<?> createFlS(@AuthenticationPrincipal MyUserDetail myUserDetail, @RequestBody FolderDTO folderDTO) {
        folderService.createFoler(folderDTO,myUserDetail.getUser().getUserId());
        return ResponseEntity.ok("Tạo thành công");
    }
}
