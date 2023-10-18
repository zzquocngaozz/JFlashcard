package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.FolderSetDTO;
import com.example.jflashcardsv0_9.dto.IdDTO;
import com.example.jflashcardsv0_9.dto.VocabDTO;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.FlashcardVocab;
import com.example.jflashcardsv0_9.entities.FolderSet;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.mapper.FlashcardMapper;
import com.example.jflashcardsv0_9.mapper.FolderMapper;
import com.example.jflashcardsv0_9.mapper.UserMapper;
import com.example.jflashcardsv0_9.repository.FolderRepository;
import com.example.jflashcardsv0_9.repository.UserRepository;
import com.example.jflashcardsv0_9.service.FolderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FolderServiceImpl implements FolderService {
    @Autowired
    FolderRepository folderRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public IdDTO createFolder(FolderSetDTO folderSetDTO, long userId) {
        FolderSet folderSet = folderRepository.save(FolderMapper.convertFolderDTOToFolderSet(folderSetDTO,userId));
        return IdDTO.builder()
                .id(folderSet.getFolderId())
                .build();
    }

    @Override
    public List<FolderSetDTO> listFolder(long userId) {
        User user = userRepository.getUserByUserId(userId);
        List<FolderSet> folderSets =  folderRepository.getAllByUser(user);
        return folderSets.stream()
                .map(FolderMapper::convertFolderSetToFolderSetDTO)
                .collect(Collectors.toList());

    }

    @Override
    public void updateFolder(long folderId, FolderSetDTO folderSetDTO, long userId) {
        FolderSet folderSet = folderRepository.getFolderSetByFolderId(folderId);
        folderSet.setTitle(folderSetDTO.getTitle());
        folderSet.setDescription(folderSetDTO.getDescription());
        folderRepository.save(folderSet);
    }

    @Override
    public void deleteFolder(long folderId, long userId) {
        folderRepository.delete(folderRepository.getFolderSetByFolderId(folderId));
    }

    @Override
    public long currentFolder(long folderId) {
        FolderSet folderSet = folderRepository.findByFolderId(folderId).orElse(null);
        if (folderSet == null) {
            // Handle the case when the FolderSet doesn't exist.
            return 0L;
        }
        Set<FlashcardSet> flashcardSets = folderSet.getFlashcardSets();
        if (flashcardSets == null) {
            // Handle the case when the FolderSet doesn't have any FlashcardSet.
            return 0L;
        }
        return (long) flashcardSets.size();
    }
}
