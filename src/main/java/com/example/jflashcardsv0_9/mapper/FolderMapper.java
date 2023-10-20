package com.example.jflashcardsv0_9.mapper;
import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.FolderSet;
import com.example.jflashcardsv0_9.repository.UserRepository;
import com.example.jflashcardsv0_9.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;


@Component
public class FolderMapper {
    static UserRepository userRepository;
    static FolderService folderService;
    @Autowired
    public FolderMapper(UserRepository userRepository, FolderService folderService) {
        this.userRepository = userRepository;
        this.folderService = folderService;
    }

    public static FolderSet convertFolderDTOToFolderSet(FolderSetDTO folderSetDTO, long userID) {
        return FolderSet.builder()
                .folderId(folderSetDTO.getFolderId())
                .title(folderSetDTO.getTitle())
                .description(folderSetDTO.getDescription())
                .createdAt(new Date(System.currentTimeMillis()))
                .user(userRepository.getUserByUserId(userID))
                .build();
    }
    public static FolderSetDTO convertFolderSetToFolderSetDTO(FolderSet folderSet) {
        return FolderSetDTO.builder()
                .folderId(folderSet.getFolderId())
                .title(folderSet.getTitle())
                .description(folderSet.getDescription())
                .createdAt(folderSet.getCreatedAt())
                .userId(folderSet.getUser().getUserId())
                .numberSet(folderService.currentFolder(folderSet.getFolderId()))
                .build();
    }

}
