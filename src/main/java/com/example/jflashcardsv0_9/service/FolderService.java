package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.FolderDTO;
import com.example.jflashcardsv0_9.entities.Folder;

public interface FolderService {
    void createFoler(FolderDTO folderDTO,Long userId);
}
