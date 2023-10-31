package com.example.jflashcardsv0_9.service.implement;
import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.*;
import com.example.jflashcardsv0_9.exception.AppException;
import com.example.jflashcardsv0_9.exception.Error;
import com.example.jflashcardsv0_9.exception.Validate;
import com.example.jflashcardsv0_9.mapper.FlashcardMapper;
import com.example.jflashcardsv0_9.mapper.UserMapper;
import com.example.jflashcardsv0_9.repository.*;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import com.example.jflashcardsv0_9.service.VotePointService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FlashcardSetServiceImpl implements FlashcardSetService {
    FlashcardSetRepository flashcardSetRepository;
    FlashcardKanjiRepository flashcardKanjiRepository;
    FlashcardVocabRepository flashcardVocabRepository;
    FlashcardGrammarRepository flashcardGrammarRepository;
    UserRepository userRepository;
    VotePointService votePointService;
    BookmarkSetRepository bookmarkSetRepository;
    BookmarkCardRepository bookmarkCardRepository;
    TrackingProgressRepository trackingProgressRepository;
    VotePointRepository votePointRepository;
    Validate validate;
    @Autowired
    public FlashcardSetServiceImpl(Validate validate,FlashcardSetRepository flashcardSetRepository, FlashcardKanjiRepository flashcardKanjiRepository, FlashcardVocabRepository flashcardVocabRepository, FlashcardGrammarRepository flashcardGrammarRepository, UserRepository userRepository, VotePointService votePointService, BookmarkSetRepository bookmarkSetRepository, BookmarkCardRepository bookmarkCardRepository, TrackingProgressRepository trackingProgressRepository, VotePointRepository votePointRepository) {
        this.validate = validate;
        this.flashcardSetRepository = flashcardSetRepository;
        this.flashcardKanjiRepository = flashcardKanjiRepository;
        this.flashcardVocabRepository = flashcardVocabRepository;
        this.flashcardGrammarRepository = flashcardGrammarRepository;
        this.userRepository = userRepository;
        this.votePointService = votePointService;
        this.bookmarkSetRepository = bookmarkSetRepository;
        this.bookmarkCardRepository = bookmarkCardRepository;
        this.trackingProgressRepository = trackingProgressRepository;
        this.votePointRepository = votePointRepository;
    }

    @Override
    public IdDTO createFlashcardSet(FlashcardSetDTORequest flashcardSetDTORequest, long userID) {
        validate.checkFlashCardSet(flashcardSetDTORequest);
        User user = userRepository.getUserByUserId(userID);
//        flashcardSet.getFlashcardSetId();
        FlashcardSet flashcardSet = flashcardSetRepository.save(FlashcardMapper.convertFlS(flashcardSetDTORequest,user));
        return IdDTO.builder()
                .id(flashcardSet.getFlashcardSetId())
                .build(); // Trả về null nếu không tìm thấy roleName
    }
    @Override
    public FlashcardSetDTOResponse viewFlashcardSetResponse(long setid, long userid) {
        validate.checkAuthSetFound(userid,setid);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        return FlashcardMapper.convertFlashcardSetDTOResponse(flashcardSet);
    }
    @Override
    public FlashcardSetDTOResponse updateFlashcardSetResponse(FlashcardSetDTORequest flashcardSetDTORequest, long setid, long userid) {
        validate.checkAuthSetFound(userid,setid);
        validate.checkFlashCardSet(flashcardSetDTORequest);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        flashcardSet.setTitle(flashcardSetDTORequest.getTitle());
        flashcardSet.setDescription(flashcardSetDTORequest.getDescription());
        flashcardSet.setPrivate(flashcardSetDTORequest.isPrivate());
        flashcardSetRepository.save(flashcardSet);
        flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        return FlashcardMapper.convertFlashcardSetDTOResponse(flashcardSet);
    }

    @Override
    public List<KanjiDTO> findAllKanjiDTOBySetId(long setid, long userid) {
        validate.checkAuthSetFound(userid,setid);
        return getKanjiDTOS(setid);
    }
    @Override
    public List<GrammarDTO> findAllGrammarDTOBySetId(long setid, long userid) {
        validate.checkAuthSetFound(userid,setid);
        return getGrammarDTOS(setid);
    }
    @Override
    public List<VocabDTO> findAllVocabDTOBySetId(long setid, long userid) {
        validate.checkAuthSetFound(userid,setid);
        return getVocabDTOS(setid);
    }

    public List<VocabDTO> getVocabDTOS(long setid) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        List<FlashcardVocab> flashcardVocabs = flashcardVocabRepository.findAllByFlashcardSet(flashcardSet);
        return flashcardVocabs.stream()
                .map((FlashcardVocab flashcardVocab) -> FlashcardMapper.convertVocabDTO(flashcardVocab,flashcardSet)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFlashcardSetById(long setid, long userid) {
        validate.checkAuthSetFound(userid,setid);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setid);
        flashcardSetRepository.delete(flashcardSet);
    }

    @Override
    public KanjiDTO createFlashcardKanji(KanjiDTO kanjiDTO, long userID,long setId) {
        validate.validateTerm(kanjiDTO.getTerm());
        validate.validateMean(kanjiDTO.getMean());
        FlashcardKanji flashcardKanji = FlashcardMapper.convertToFlashcardKanjiEntity(kanjiDTO,setId);
        FlashcardKanji flashcardKanji1 = flashcardKanjiRepository.save(flashcardKanji);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        return FlashcardMapper.convertKanjiDTO(flashcardKanji1,flashcardSet);
    }

    @Override
    public List<KanjiDTO> createFlashcardKanjiList(List<KanjiDTO> kanjiDTOs, long userID, long setId) {
        for (KanjiDTO dto : kanjiDTOs) {
            validate.validateTerm(dto.getTerm());
            validate.validateMean(dto.getMean());
        }
        List<FlashcardKanji> entities = kanjiDTOs.stream()
                .map((KanjiDTO dto) -> FlashcardMapper.convertToFlashcardKanjiEntity(dto,setId))
                .collect(Collectors.toList());
        flashcardKanjiRepository.saveAll(entities);
        return getKanjiDTOS(setId);
    }

    public List<KanjiDTO> getKanjiDTOS(long setId) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        List<FlashcardKanji> flashcardKanjis = flashcardKanjiRepository.findAllByFlashcardSet(flashcardSet);
        return flashcardKanjis.stream()
                .map((FlashcardKanji flashcardKanji) -> FlashcardMapper.convertKanjiDTO(flashcardKanji,flashcardSet)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
    }

    @Override
    public void updateKanjiCard(KanjiDTO kanjiDTO, long userID, long setId) {
        validate.validateTerm(kanjiDTO.getTerm());
        validate.validateMean(kanjiDTO.getMean());
        FlashcardKanji flashcardKanji = flashcardKanjiRepository.getFlashcardKanjiByCardKanjiId(kanjiDTO.getCardId());
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
// xu lu ngu phap
    @Override
    public GrammarDTO createFlashcardGrammar(GrammarDTO grammarDTO, long userID, long setId) {
        validate.validateTerm(grammarDTO.getTerm());
        validate.validateMean(grammarDTO.getMean());
        FlashcardGrammar flashcardGrammar = FlashcardMapper.convertToFlashcardGrammarEntity(grammarDTO,setId);
        FlashcardGrammar flashcardGrammar1 = flashcardGrammarRepository.save(flashcardGrammar);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        return FlashcardMapper.convertGrammarDTO(flashcardGrammar1,flashcardSet);
    }

    @Override
    public List<GrammarDTO> createFlashcardGrammarList(List<GrammarDTO> grammarDTOs, long userID, long setId) {
        for (GrammarDTO dto : grammarDTOs) {
            validate.validateTerm(dto.getTerm());
            validate.validateMean(dto.getMean());
        }
        List<FlashcardGrammar> entities = grammarDTOs.stream()
                .map((GrammarDTO dto) -> FlashcardMapper.convertToFlashcardGrammarEntity(dto,setId))
                .collect(Collectors.toList());
        flashcardGrammarRepository.saveAll(entities);
        return getGrammarDTOS(setId);
    }

    public List<GrammarDTO> getGrammarDTOS(long setId) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        List<FlashcardGrammar> flashcardGrammars = flashcardGrammarRepository.findAllByFlashcardSet(flashcardSet);
        return flashcardGrammars.stream()
                .map((FlashcardGrammar flashcardGrammar) -> FlashcardMapper.convertGrammarDTO(flashcardGrammar,flashcardSet)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
    }

    @Override
    public void updateGrammarCard(GrammarDTO grammarDTO, long userID, long setId) {
        validate.validateTerm(grammarDTO.getTerm());
        validate.validateMean(grammarDTO.getMean());
        FlashcardGrammar flashcardGrammar = flashcardGrammarRepository.getFlashcardGrammarByCardGrammarId(grammarDTO.getCardId());
        flashcardGrammar.setCombination(grammarDTO.getCombination());
        flashcardGrammar.setNote(grammarDTO.getNote());
        flashcardGrammar.setTerm(grammarDTO.getTerm());
        flashcardGrammar.setMean(grammarDTO.getMean());
        flashcardGrammar.setExample(grammarDTO.getExample());
        flashcardGrammar.setExampleMean(grammarDTO.getExampleMean());
        flashcardGrammar.setImgUrl(grammarDTO.getImgUrl());
        flashcardGrammarRepository.save(flashcardGrammar);

    }


    @Override
    public void deleteFlGrammar(long cardId) {
         FlashcardGrammar flashcardGrammar = flashcardGrammarRepository.getFlashcardGrammarByCardGrammarId(cardId);
         flashcardGrammarRepository.delete(flashcardGrammar);
    }

    @Override
    public VocabDTO createFlashcardVocab(VocabDTO vocabDTO, long userID, long setId) {
        validate.validateTerm(vocabDTO.getTerm());
        validate.validateMean(vocabDTO.getMean());
        FlashcardVocab flashcardVocab = FlashcardMapper.convertToFlashcardVocabEntity(vocabDTO,setId);
        FlashcardVocab flashcardVocab1 = flashcardVocabRepository.save(flashcardVocab);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        return FlashcardMapper.convertVocabDTO(flashcardVocab1,flashcardSet);
    }

    @Override
    public List<VocabDTO> createFlashcardVocabList(List<VocabDTO> vocabDTOs, long userID, long setId) {
        for (VocabDTO dto : vocabDTOs) {
            validate.validateTerm(dto.getTerm());
            validate.validateMean(dto.getMean());
        }
        List<FlashcardVocab> entities = vocabDTOs.stream()
                .map((VocabDTO dto) -> FlashcardMapper.convertToFlashcardVocabEntity(dto,setId))
                .collect(Collectors.toList());
        flashcardVocabRepository.saveAll(entities);
        return getVocabDTOS(setId);
    }

    @Override
    public void updateVocabCard(VocabDTO vocabDTO, long userID, long setId) {
        validate.validateTerm(vocabDTO.getTerm());
        validate.validateMean(vocabDTO.getMean());
        FlashcardVocab flashcardVocab = flashcardVocabRepository.getFlashcardVocabByCardVocabId(vocabDTO.getCardId());
        flashcardVocab.setTerm(vocabDTO.getTerm());
        flashcardVocab.setMean(vocabDTO.getMean());
        flashcardVocab.setExample(vocabDTO.getExample());
        flashcardVocab.setExampleMean(vocabDTO.getExampleMean());
        flashcardVocab.setImgUrl(vocabDTO.getImgUrl());
        flashcardVocabRepository.save(flashcardVocab);
    }

// xu ly vocab

    @Override
    public void deleteFlvocab(long cardId) {
        FlashcardVocab flashcardVocab = flashcardVocabRepository.getFlashcardVocabByCardVocabId(cardId);
        flashcardVocabRepository.delete(flashcardVocab);
    }

    @Override
    public long numberCard(long setId, int type) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        //kanji
        if(type == 1){
            List<FlashcardKanji> flashcardKanjis = flashcardKanjiRepository.findAllByFlashcardSet(flashcardSet);
            return flashcardKanjis.size();
        }
        // tu vựng
        else if (type == 2){
            List<FlashcardVocab> flashcardVocabs = flashcardVocabRepository.findAllByFlashcardSet(flashcardSet);
            return flashcardVocabs.size();
        }
        // ngữ pháp
        else if (type == 3){
            List<FlashcardGrammar> flashcardGrammars = flashcardGrammarRepository.findAllByFlashcardSet(flashcardSet);
            return flashcardGrammars.size();
        }
        return 0;
    }

    @Override
    public List<SetSingleDTO> searchFlashcardSetPublic(String title) {
        if(title == null) title = "";
        List<FlashcardSet> flashcardSets = flashcardSetRepository.findAllByTitleContainingAndIsPrivate(title,false);
        return flashcardSets.stream()
                .map(FlashcardMapper::convertSetSingleDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ReadSetDTO readFlashcardSet(User user, long setId) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        List<Card> cards = new ArrayList<>();

//                    "Kanji";
        if(flashcardSet.getType() == 1){
            cards.addAll(getKanjiDTOS(setId));
        }
        //            "Từ vựng";
        else if(flashcardSet.getType() == 2){
            cards.addAll(getVocabDTOS(setId));

        }
//             "Ngữ pháp";
        else if(flashcardSet.getType() == 3){
            cards.addAll(getGrammarDTOS(setId));
        }
        List<BookMarkCard> bookMarkCards = bookmarkCardRepository.getAllByUserAndAndFlashcardSet(user,flashcardSet);
        List<ReadSetDTO.MarkedCard> markedCards = new ArrayList<>();
        for (BookMarkCard bookMarkCard : bookMarkCards) {
            ReadSetDTO.MarkedCard markedCard = ReadSetDTO.MarkedCard.builder()
                    .bookMarkCardId(bookMarkCard.getBookMarkCardId())
                    .userId(bookMarkCard.getUser().getUserId())
                    .flashcardSetId(bookMarkCard.getFlashcardSet().getFlashcardSetId())
                    .cardId(bookMarkCard.getCardId())
                    .build();
            markedCards.add(markedCard);
        }
        List<TrackingProgress> trackingProgresses = trackingProgressRepository.getAllByUserAndFlashcardSet(user,flashcardSet);
        List<ReadSetDTO.LearnedCard> learnedCards = new ArrayList<>();
        for(TrackingProgress trackingProgress :  trackingProgresses ){
            ReadSetDTO.LearnedCard learnedCard = ReadSetDTO.LearnedCard.builder()
                    .trackingProgressId(trackingProgress.getTrackingProgressId())
                    .userId(trackingProgress.getUser().getUserId())
                    .flashcardSetId(trackingProgress.getFlashcardSet().getFlashcardSetId())
                    .cardId(trackingProgress.getCardId())
                    .createdAt(trackingProgress.getCreatedAt())
                    .lastLearn(trackingProgress.getLastLearn())
                    .build();
            learnedCards.add(learnedCard);
        }
        VotePoint votePoint = votePointRepository.getVotePointByFlashcardSetAndUser(flashcardSet, user);
        int voted = (votePoint != null) ? votePoint.getPoint() : 0;
        return ReadSetDTO.builder()
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .title(flashcardSet.getTitle())
                .description(flashcardSet.getDescription())
                .createdAt(flashcardSet.getCreatedAt())
                .type(flashcardSet.getType())
                .isPrivate(flashcardSet.isPrivate())
                .isBookMarked(bookmarkSetRepository.existsBookMarkSetByUserAndAndFlashcardSet(user,flashcardSet))
                .voted(voted)
                .numberCard(numberCard(flashcardSet.getFlashcardSetId(),flashcardSet.getType()))
                .votePoint(votePointService.countNumberVoteBySetId(flashcardSet.getFlashcardSetId()))
                .numberVote(votePointService.currentNumberVoteBySetId(flashcardSet.getFlashcardSetId()))
                .authDTO(UserMapper.toAuthDTO(flashcardSet.getUser()))
                .cards(cards)
                .learnedCards(learnedCards)
                .markedCards(markedCards)
                .build();
    }
}
