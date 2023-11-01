package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.FlashcardVocab;
import com.example.jflashcardsv0_9.entities.FolderSet;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.exception.AppException;
import com.example.jflashcardsv0_9.exception.Error;
import com.example.jflashcardsv0_9.exception.Validate;
import com.example.jflashcardsv0_9.mapper.FlashcardMapper;
import com.example.jflashcardsv0_9.mapper.FolderMapper;
import com.example.jflashcardsv0_9.mapper.UserMapper;
import com.example.jflashcardsv0_9.repository.FlashcardSetRepository;
import com.example.jflashcardsv0_9.repository.FolderRepository;
import com.example.jflashcardsv0_9.repository.UserRepository;
import com.example.jflashcardsv0_9.service.FolderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FolderServiceImpl implements FolderService {
    FolderRepository folderRepository;
    UserRepository userRepository;
    FlashcardSetRepository flashcardSetRepository;
    Validate validate;
    @Autowired
    public FolderServiceImpl(FolderRepository folderRepository, UserRepository userRepository, FlashcardSetRepository flashcardSetRepository,Validate validate) {
        this.folderRepository = folderRepository;
        this.userRepository = userRepository;
        this.flashcardSetRepository = flashcardSetRepository;
        this.validate = validate;
    }

    @Override
    public IdDTO createFolder(FolderSetDTO folderSetDTO, long userId) {
        validate.checkFolder(folderSetDTO);
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
        validate.checkFolder(folderSetDTO);
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

    @Override
    public FolderSetDTO viewFolderById(long userId, long folderId) {
        FolderSet folderSet = folderRepository.getFolderSetByFolderId(folderId);
        return FolderMapper.convertFolderSetToFolderSetDTO(folderSet);
    }

    @Override
    public List<SetSingleDTO> viewListSetByFolderId(long userId, long folderId) {
        User user = userRepository.getUserByUserId(userId);
        // Tìm FolderSet bằng ID
        FolderSet folderSet = folderRepository.findByFolderId(folderId).orElse(null);
        if(folderSet == null){
            throw new AppException(Error.SET_NOT_FOUND);
        }

        // Lấy danh sách FlashcardSet từ FolderSet
        Set<FlashcardSet> flashcardSets = folderSet.getFlashcardSets();

        // Chuyển Set thành danh sách (List) nếu cần
        List<FlashcardSet> flashcardSets1 = new ArrayList<>(flashcardSets);
        return flashcardSets1.stream()
                .map((FlashcardSet flashcardSet) -> FlashcardMapper.convertSetSingleDTO(flashcardSet))
                .collect(Collectors.toList());
    }

    @Override
    public List<FlashcardSetDTOResponse> getListSetOfUser(long userId, long folderId) {
        List<FlashcardSet> allUserFlashcardSets = flashcardSetRepository.getAllByUser(userRepository.getUserByUserId(userId));
        // Lấy danh sách FlashcardSet từ FolderSet
        FolderSet folderSet = folderRepository.findByFolderId(folderId).orElse(null);
        if(folderSet == null){
            throw new AppException(Error.SET_NOT_FOUND);
        }

        // Lấy danh sách FlashcardSet từ FolderSet
        Set<FlashcardSet> flashcardSets = folderSet.getFlashcardSets();

        // Chuyển Set thành danh sách (List) nếu cần
        List<FlashcardSet> flashcardSets1 = new ArrayList<>(flashcardSets);
        // Loại bỏ các FlashcardSet đã có trong FolderSet
        allUserFlashcardSets.removeAll(flashcardSets1);

        return allUserFlashcardSets.stream()
                .map((FlashcardSet flashcardSet) -> FlashcardMapper.convertFlashcardSetDTOResponse(flashcardSet))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteSetInFolder(long userId, long folderId, long setId) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        FolderSet folderSet = folderRepository.getFolderSetByFolderId(folderId);
        folderSet.getFlashcardSets().remove(flashcardSet);
        folderRepository.save(folderSet);
    }

    @Override
    public void addSetInFolder(long userId, long folderId, long setId) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        FolderSet folderSet = folderRepository.getFolderSetByFolderId(folderId);
        folderSet.getFlashcardSets().add(flashcardSet);
        folderRepository.save(folderSet);
    }
}
