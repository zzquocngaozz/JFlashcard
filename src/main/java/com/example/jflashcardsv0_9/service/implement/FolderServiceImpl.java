package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.FolderDTO;
import com.example.jflashcardsv0_9.mapper.FolderMapper;
import com.example.jflashcardsv0_9.repository.FolderRepository;
import com.example.jflashcardsv0_9.service.FolderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FolderServiceImpl implements FolderService {
    @Autowired
    FolderRepository folderRepository;
    @Override
    public void createFoler(FolderDTO folderDTO, Long userId) {
        folderRepository.save(FolderMapper.convertFolderDTOToFolder(folderDTO,userId));
    }
}
