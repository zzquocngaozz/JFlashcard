package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.FlashcardSetDTOResponse;
import com.example.jflashcardsv0_9.dto.FolderSetDTO;
import com.example.jflashcardsv0_9.dto.IdDTO;
import com.example.jflashcardsv0_9.dto.SetSingleDTO;
import com.example.jflashcardsv0_9.entities.FolderSet;
import org.springframework.stereotype.Service;


import java.util.List;
@Service

public interface FolderService {
    IdDTO createFolder(FolderSetDTO folderSetDTO, long userId);
    List<FolderSetDTO> listFolder(long userId);

    void updateFolder(long folderId, FolderSetDTO folderSetDTO,long userId);
    void deleteFolder(long folderId,long userId);

    long currentFolder(long folderId);

    FolderSetDTO viewFolderById(long userId,long folderId);
    List<SetSingleDTO> viewListSetByFolderId(long userId,long folderId);
    List<FlashcardSetDTOResponse> getListSetOfUser(long userId, long  folderId);

    void deleteSetInFolder(long userId, long  folderId,long setId);
    void addSetInFolder(long userId, long  folderId,long setId);

}
