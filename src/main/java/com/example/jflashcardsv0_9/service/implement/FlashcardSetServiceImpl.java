package com.example.jflashcardsv0_9.service.implement;
import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.*;
import com.example.jflashcardsv0_9.exception.AppException;
import com.example.jflashcardsv0_9.exception.Error;
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
    private void CheckAuthandsetfound(long userid,long setid) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        User user = userRepository.getUserByUserId(userid);
        if(flashcardSetRepository.existsFlashcardSetByFlashcardSetId(setid) == false){
            throw new AppException(Error.SET_NOT_FOUND);
        }
        if(flashcardSet.getUser().getUserId() !=  user.getUserId()){
            throw new AppException(Error.AUTH_GI_DO);
        }

    }
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
    public FlashcardSetDTOResponse viewFlashcardSetResponse(long setid, long userid) {
        CheckAuthandsetfound(userid,setid);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        User user = userRepository.getUserByUserId(userid);
        return FlashcardMapper.convertFlashcardSetDTOResponse(flashcardSet,user);
    }
    @Override
    public FlashcardSetDTOResponse updateFlashcardSetResponse(FlashcardSetDTORequest flashcardSetDTORequest, long setid, long userid) {
        CheckAuthandsetfound(userid,setid);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        flashcardSet.setTitle(flashcardSetDTORequest.getTitle());
        flashcardSet.setDescription(flashcardSetDTORequest.getDescription());
        flashcardSet.setPrivate(flashcardSetDTORequest.isPrivate());
        flashcardSetRepository.save(flashcardSet);
        flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        User user = userRepository.getUserByUserId(userid);
        return FlashcardMapper.convertFlashcardSetDTOResponse(flashcardSet,user);
    }

    @Override
    public List<KanjiDTO> findAllKanjiDTOBySetId(long setid, long userid) {
        CheckAuthandsetfound(userid,setid);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        List<FlashcardKanji> flashcardKanjis = flashcardKanjiRepository.findAllByFlashcardSet(flashcardSet);
        List<KanjiDTO> kanjiDTOS = flashcardKanjis.stream()
                .map((FlashcardKanji flashcardKanji) -> FlashcardMapper.convertKanjiDTO(flashcardKanji,flashcardSet)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
        return kanjiDTOS;
    }
    @Override
    public List<GrammarDTO> findAllGrammarDTOBySetId(long setid, long userid) {
        CheckAuthandsetfound(userid,setid);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        List<FlashcardGrammar> flashcardGrammars = flashcardGrammarRepository.findAllByFlashcardSet(flashcardSet);
        List<GrammarDTO> grammarDTOS = flashcardGrammars.stream()
                .map((FlashcardGrammar flashcardGrammar) -> FlashcardMapper.convertGrammarDTO(flashcardGrammar,flashcardSet)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
        return grammarDTOS;
    }
    @Override
    public List<VocabDTO> findAllVocabDTOBySetId(long setid, long userid) {
        CheckAuthandsetfound(userid,setid);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        List<FlashcardVocab> flashcardVocabs = flashcardVocabRepository.findAllByFlashcardSet(flashcardSet);
        List<VocabDTO> vocabDTOS = flashcardVocabs.stream()
                .map((FlashcardVocab flashcardVocab) -> FlashcardMapper.convertVocabDTO(flashcardVocab,flashcardSet)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
        return vocabDTOS;
    }

    @Override
    public void deleteFlashcardSetById(long setid, long userid) {
        CheckAuthandsetfound(userid,setid);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        flashcardSetRepository.delete(flashcardSet);
    }

    @Override
    public KanjiDTO createFlashcardKanji(KanjiDTO kanjiDTO, long userID,long setId) {
        FlashcardKanji flashcardKanji = FlashcardMapper.convertToFlashcardKanjiEntity(kanjiDTO,setId);
        FlashcardKanji flashcardKanji1 = flashcardKanjiRepository.save(flashcardKanji);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        return FlashcardMapper.convertKanjiDTO(flashcardKanji1,flashcardSet);
    }

    @Override
    public void updateKanjiCard(KanjiDTO kanjiDTO, long userID, long setId) {
        FlashcardKanji flashcardKanji = flashcardKanjiRepository.getFlashcardKanjiByCardKanjiId(kanjiDTO.getCardKanjiId());
        flashcardKanji.setOnSound(kanjiDTO.getOnSound());
        flashcardKanji.setKunSound(kanjiDTO.getKunSound());
        flashcardKanji.setChineseSound(kanjiDTO.getChineseSound());
        flashcardKanji.setTerm(kanjiDTO.getTerm());
        flashcardKanji.setMean(kanjiDTO.getMean());
        flashcardKanji.setExample(kanjiDTO.getExample());
        flashcardKanji.setExampleMean(kanjiDTO.getExampleMean());
        flashcardKanji.setImgUrl(kanjiDTO.getImgUrl());
        flashcardKanji.setTrick(kanjiDTO.getTrick());
        flashcardKanjiRepository.save(flashcardKanji);
    }

    @Override
    public void deleteFlKanji(long cardId) {
        FlashcardKanji flashcardKanji = flashcardKanjiRepository.getFlashcardKanjiByCardKanjiId(cardId);
        flashcardKanjiRepository.delete(flashcardKanji);

    }

    @Override
    public GrammarDTO createFlashcardGrammar(GrammarDTO grammarDTO, long userID) {
        return null;
    }

    @Override
    public void deleteFlGrammar(long cardId) {
         FlashcardGrammar flashcardGrammar = flashcardGrammarRepository.getFlashcardGrammarByCardGrammarId(cardId);
         flashcardGrammarRepository.delete(flashcardGrammar);
    }

    @Override
    public VocabDTO createFlashcardVocab(VocabDTO vocabDTO, long userID) {
        return null;
    }

    @Override
    public void deleteFlvocab(long cardId) {
        FlashcardVocab flashcardVocab = flashcardVocabRepository.getFlashcardVocabByCardVocabId(cardId);
        flashcardVocabRepository.delete(flashcardVocab);
    }
}
