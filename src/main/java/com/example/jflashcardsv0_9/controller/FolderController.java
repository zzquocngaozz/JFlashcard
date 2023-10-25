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
    @GetMapping("/{folderId}/view-folder")
    public FolderSetDTO viewFolderById(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long folderId) {
        return folderService.viewFolderById(myUserDetail.getUser().getUserId(),folderId);
    }
    @GetMapping("/{folderId}/view-set-folder")
    public List<SetSingleDTO> viewListFolderSetById(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long folderId) {
        return folderService.viewListSetByFolderId(myUserDetail.getUser().getUserId(),folderId);
    }

    @GetMapping("/{folderId}/get-all-set")
    public List<FlashcardSetDTOResponse> getListSetOfUserInFolder(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long folderId) {
        return folderService.getListSetOfUser(myUserDetail.getUser().getUserId(),folderId);
    }
    @PostMapping("/{folderId}/get-all-set/{setId}")
    public ResponseEntity<?> addSetInFolder(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long folderId, @PathVariable long setId) {
        folderService.addSetInFolder(myUserDetail.getUser().getUserId(),folderId,setId);
        return ResponseEntity.ok("thêm thành công");

    }
    @DeleteMapping("/{folderId}/get-all-set/{setId}")
    public ResponseEntity<?> deleteSetInFolder(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long folderId, @PathVariable long setId) {
        folderService.deleteSetInFolder(myUserDetail.getUser().getUserId(),folderId,setId);
        return ResponseEntity.ok("xóa thành công");
    }



}
