package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.FolderSetDTO;
import com.example.jflashcardsv0_9.dto.IdDTO;
import com.example.jflashcardsv0_9.entities.FolderSet;


import java.util.List;

public interface FolderService {
    IdDTO createFolder(FolderSetDTO folderSetDTO, long userId);
    List<FolderSetDTO> listFolder(long userId);

    void updateFolder(long folderId, FolderSetDTO folderSetDTO,long userId);
    void deleteFolder(long folderId,long userId);

    long currentFolder(long folderId);


}
