package com.example.jflashcardsv0_9.service.implement;
import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.*;
import com.example.jflashcardsv0_9.mapper.FlashcardMapper;
import com.example.jflashcardsv0_9.mapper.UserMapper;
import com.example.jflashcardsv0_9.repository.*;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FlashcardSetServiceImpl implements FlashcardSetService {
    @Autowired
    FlashcardSetRepository flashcardSetRepository;
    @Autowired
    FlashcardKanjiRepository flashcardKanjiRepository;
    @Autowired
    FlashcardVocabRepository flashcardVocabRepository;
    @Autowired
    FlashcardGrammarRepository flashcardGrammarRepository;
    @Autowired
    UserRepository userRepository;
    @Override
    public IdDTO createFlashcardSet(FlashcardSetDTORequest flashcardSetDTORequest, long userID) {
        User user = userRepository.getUserByUserId(userID);
//        flashcardSet.getFlashcardSetId();
        FlashcardSet flashcardSet = flashcardSetRepository.save(FlashcardMapper.convertFlS(flashcardSetDTORequest,user));
        return IdDTO.builder()
                .id(flashcardSet.getFlashcardSetId())
                .build(); // Trả về null nếu không tìm thấy roleName
    }

    @Override
    public FlashcardSetDTOResponse updateFlashcardSetResponse(long setid, long userid) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        User user = userRepository.getUserByUserId(userid);
        List<FlashcardGrammar> flashcardGrammars = flashcardGrammarRepository.findAllByFlashcardSet(flashcardSet);
        List<GrammarDTO> grammarDTOS = flashcardGrammars.stream()
                .map((FlashcardGrammar flashcardGrammar) -> FlashcardMapper.convertGrammarDTO(flashcardGrammar,flashcardSet)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
        List<FlashcardKanji> flashcardKanjis = flashcardKanjiRepository.findAllByFlashcardSet(flashcardSet);
        List<KanjiDTO> kanjiDTOS = flashcardKanjis.stream()
                .map((FlashcardKanji flashcardKanji) -> FlashcardMapper.convertKanjiDTO(flashcardKanji,flashcardSet)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
        List<FlashcardVocab> flashcardVocabs = flashcardVocabRepository.findAllByFlashcardSet(flashcardSet);
        List<VocabDTO> vocabDTOS = flashcardVocabs.stream()
                .map((FlashcardVocab flashcardVocab) -> FlashcardMapper.convertVocabDTO(flashcardVocab,flashcardSet)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
        return FlashcardMapper.convertFlashcardSetDTOResponse(
                flashcardSet,user,grammarDTOS,kanjiDTOS,vocabDTOS
        );
    }
}
