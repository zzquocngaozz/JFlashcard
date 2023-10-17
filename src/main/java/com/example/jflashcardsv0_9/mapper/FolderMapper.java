package com.example.jflashcardsv0_9.mapper;
import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.Folder;
import com.example.jflashcardsv0_9.repository.UserRepository;
import org.springframework.stereotype.Component;


@Component
public class FolderMapper {
    static UserRepository userRepository;
    public FolderMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public static Folder convertFolderDTOToFolder(FolderDTO folderDTO,long userID) {
        return Folder.builder()
                .title(folderDTO.getTitle())
                .description(folderDTO.getDescription())
                .createdAt(folderDTO.getCreatedAt())
                .user(userRepository.getUserByUserId(userID))
                .build();
    }
}
