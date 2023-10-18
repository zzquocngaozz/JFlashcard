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

    @GetMapping
    public List<FolderSetDTO> listFolderSet(@AuthenticationPrincipal MyUserDetail myUserDetail) {
        return folderService.listFolder(myUserDetail.getUser().getUserId());
    }

    @PostMapping
    public IdDTO createFolderSet(@AuthenticationPrincipal MyUserDetail myUserDetail, @RequestBody FolderSetDTO folderSetDTO) {
        System.out.println("hiiiiiiiiiiiiiiiiiiii");
        System.out.println(myUserDetail.getUser().getUserId());
        return folderService.createFolder(folderSetDTO,myUserDetail.getUser().getUserId());
    }
    @PutMapping("/{folderId}/edit")
    public ResponseEntity<?> updateFolder(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long folderId, @RequestBody FolderSetDTO folderSetDTO) {
        folderService.updateFolder(folderId,folderSetDTO,myUserDetail.getUser().getUserId());
        return ResponseEntity.ok("sửa thành công");
    }
    @DeleteMapping("/{folderId}/edit")
    public ResponseEntity<?> deleteFolderSet(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long folderId) {
        folderService.deleteFolder(folderId,myUserDetail.getUser().getUserId());
        return ResponseEntity.ok("xóa thành công");
    }

}
