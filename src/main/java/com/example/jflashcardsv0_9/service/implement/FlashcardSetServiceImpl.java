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
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
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
    OpenedFlashcardSetRepository openedFlashcardSetRepository;
    FlashcardSetAssociationRepository flashcardSetAssociationRepository;
    @Autowired
    public FlashcardSetServiceImpl(Validate validate, FlashcardSetRepository flashcardSetRepository, FlashcardKanjiRepository flashcardKanjiRepository, FlashcardVocabRepository flashcardVocabRepository, FlashcardGrammarRepository flashcardGrammarRepository, UserRepository userRepository, VotePointService votePointService, BookmarkSetRepository bookmarkSetRepository, BookmarkCardRepository bookmarkCardRepository, TrackingProgressRepository trackingProgressRepository, VotePointRepository votePointRepository, OpenedFlashcardSetRepository openedFlashcardSetRepository, FlashcardSetAssociationRepository flashcardSetAssociationRepository) {
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
        this.openedFlashcardSetRepository = openedFlashcardSetRepository;
        this.flashcardSetAssociationRepository = flashcardSetAssociationRepository;
    }
    @Override
    public List<KanjiDTO> getKanjiDTOS(FlashcardSet flashcardSet) {
        List<FlashcardSetAssociation> flashcardSetAssociations = flashcardSetAssociationRepository.findAllByFlashcardSet(flashcardSet);
        List<FlashcardKanji> flashcardKanjis = new ArrayList<>();
        for (FlashcardSetAssociation flashcardSetAssociation : flashcardSetAssociations){
            FlashcardKanji flashcardKanji = flashcardKanjiRepository.getFlashcardKanjiByCardKanjiId(flashcardSetAssociation.getCardId());
            flashcardKanjis.add(flashcardKanji);
        }
        return flashcardKanjis.stream()
                .map((FlashcardKanji flashcardKanji) -> FlashcardMapper.convertKanjiDTO(flashcardKanji)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
    }
    @Override
    public List<VocabDTO> getVocabDTOS(FlashcardSet flashcardSet) {
        List<FlashcardSetAssociation> flashcardSetAssociations = flashcardSetAssociationRepository.findAllByFlashcardSet(flashcardSet);
        List<FlashcardVocab> flashcardVocabs = new ArrayList<>();
        for (FlashcardSetAssociation flashcardSetAssociation : flashcardSetAssociations){
            FlashcardVocab flashcardVocab = flashcardVocabRepository.getFlashcardVocabByCardVocabId(flashcardSetAssociation.getCardId());
            flashcardVocabs.add(flashcardVocab);
        }
        return flashcardVocabs.stream()
                .map((FlashcardVocab flashcardVocab) -> FlashcardMapper.convertVocabDTO(flashcardVocab)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
    }
    @Override
    public List<GrammarDTO> getGrammarDTOS(FlashcardSet flashcardSet) {
        List<FlashcardSetAssociation> flashcardSetAssociations = flashcardSetAssociationRepository.findAllByFlashcardSet(flashcardSet);
        List<FlashcardGrammar> flashcardGrammars = new ArrayList<>();
        for (FlashcardSetAssociation flashcardSetAssociation : flashcardSetAssociations){
            FlashcardGrammar flashcardGrammar = flashcardGrammarRepository.getFlashcardGrammarByCardGrammarId(flashcardSetAssociation.getCardId());
            flashcardGrammars.add(flashcardGrammar);
        }
        return flashcardGrammars.stream()
                .map((FlashcardGrammar flashcardGrammar) -> FlashcardMapper.convertGrammarDTO(flashcardGrammar)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                .collect(Collectors.toList());
    }
    @Override
    public IdDTO createFlashcardSet(FlashcardSetDTORequest flashcardSetDTORequest, User user) {
        validate.checkFlashCardSet(flashcardSetDTORequest);
//        flashcardSet.getFlashcardSetId();
        FlashcardSet flashcardSet = flashcardSetRepository.save(FlashcardMapper.convertFlS(flashcardSetDTORequest,user));
        return IdDTO.builder()
                .id(flashcardSet.getFlashcardSetId())
                .build(); // Trả về null nếu không tìm thấy roleName
    }
    @Override
    public FlashcardSetDTOResponse viewFlashcardSetResponse(long setId, User user) {
        validate.checkAuthSetFound(user,setId);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        return FlashcardMapper.convertFlashcardSetDTOResponse(flashcardSet);
    }
    @Override
    public FlashcardSetDTOResponse updateFlashcardSetResponse(FlashcardSetDTORequest flashcardSetDTORequest, long setId, User user) {
        validate.checkAuthSetFound(user,setId);
        validate.checkFlashCardSet(flashcardSetDTORequest);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        flashcardSet.setTitle(flashcardSetDTORequest.getTitle());
        flashcardSet.setDescription(flashcardSetDTORequest.getDescription());
        flashcardSet.setStatus(flashcardSetDTORequest.getStatus());
        FlashcardSet set = flashcardSetRepository.save(flashcardSet);
        return FlashcardMapper.convertFlashcardSetDTOResponse(set);
    }
    @Override
    public void deleteFlashcardSetById(long setId, User user) {
        validate.checkAuthSetFound(user,setId);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        flashcardSet.setStatus(4);
        flashcardSetRepository.save(flashcardSet);
    }
    @Override
    public void createFlashcardKanji(KanjiDTO kanjiDTO, User user) {
        validate.validateTerm(kanjiDTO.getTerm());
        validate.validateMean(kanjiDTO.getMean());
        FlashcardKanji flashcardKanji = FlashcardMapper.convertToFlashcardKanjiEntity(kanjiDTO,user);
        flashcardKanjiRepository.save(flashcardKanji);
    }
    @Override
    public void createFlashcardKanjiList(List<KanjiDTO> kanjiDTOs, User user) {
        for (KanjiDTO dto : kanjiDTOs) {
            validate.validateTerm(dto.getTerm());
            validate.validateMean(dto.getMean());
        }
        List<FlashcardKanji> entities = kanjiDTOs.stream()
                .map((KanjiDTO dto) -> FlashcardMapper.convertToFlashcardKanjiEntity(dto,user))
                .collect(Collectors.toList());
        flashcardKanjiRepository.saveAll(entities);
    }
    @Override
    public void updateKanjiCard(KanjiDTO kanjiDTO, User user) {
        validate.validateTerm(kanjiDTO.getTerm());
        validate.validateMean(kanjiDTO.getMean());
        FlashcardKanji flashcardKanji = flashcardKanjiRepository.getFlashcardKanjiByCardKanjiId(kanjiDTO.getCardId());
        flashcardKanji.setOnSound(kanjiDTO.getOnSound());
        flashcardKanji.setStatus(kanjiDTO.getStatus());
        flashcardKanji.setKunSound(kanjiDTO.getKunSound());
        flashcardKanji.setChineseSound(kanjiDTO.getChineseSound());
        flashcardKanji.setTerm(kanjiDTO.getTerm());
        flashcardKanji.setMean(kanjiDTO.getMean());
        flashcardKanji.setExample(kanjiDTO.getExample());
        flashcardKanji.setExampleMean(kanjiDTO.getExampleMean());
        flashcardKanji.setImgUrl(kanjiDTO.getImgUrl());
        flashcardKanji.setTrick(kanjiDTO.getTrick());
        flashcardKanji.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        flashcardKanjiRepository.save(flashcardKanji);
    }
    @Override
    public void deleteFlKanji(long cardId) {
        FlashcardKanji flashcardKanji = flashcardKanjiRepository.getFlashcardKanjiByCardKanjiId(cardId);
        flashcardKanji.setStatus(4);
        flashcardKanjiRepository.save(flashcardKanji);

    }
// xu lu ngu phap
    @Override
    public void createFlashcardGrammar(GrammarDTO grammarDTO, User user) {
        validate.validateTerm(grammarDTO.getTerm());
        validate.validateMean(grammarDTO.getMean());
        FlashcardGrammar flashcardGrammar = FlashcardMapper.convertToFlashcardGrammarEntity(grammarDTO,user);
        flashcardGrammarRepository.save(flashcardGrammar);
    }
    @Override
    public void createFlashcardGrammarList(List<GrammarDTO> grammarDTOs, User user) {
        for (GrammarDTO dto : grammarDTOs) {
            validate.validateTerm(dto.getTerm());
            validate.validateMean(dto.getMean());
        }
        List<FlashcardGrammar> entities = grammarDTOs.stream()
                .map((GrammarDTO dto) -> FlashcardMapper.convertToFlashcardGrammarEntity(dto,user))
                .collect(Collectors.toList());
        flashcardGrammarRepository.saveAll(entities);
    }
    @Override
    public void updateGrammarCard(GrammarDTO grammarDTO, User user) {
        validate.validateTerm(grammarDTO.getTerm());
        validate.validateMean(grammarDTO.getMean());
        FlashcardGrammar flashcardGrammar = flashcardGrammarRepository.getFlashcardGrammarByCardGrammarId(grammarDTO.getCardId());
        flashcardGrammar.setCombination(grammarDTO.getCombination());
        flashcardGrammar.setStatus(grammarDTO.getStatus());
        flashcardGrammar.setNote(grammarDTO.getNote());
        flashcardGrammar.setTerm(grammarDTO.getTerm());
        flashcardGrammar.setMean(grammarDTO.getMean());
        flashcardGrammar.setExample(grammarDTO.getExample());
        flashcardGrammar.setExampleMean(grammarDTO.getExampleMean());
        flashcardGrammar.setImgUrl(grammarDTO.getImgUrl());
        flashcardGrammar.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        flashcardGrammarRepository.save(flashcardGrammar);

    }
    @Override
    public void deleteFlGrammar(long cardId) {
         FlashcardGrammar flashcardGrammar = flashcardGrammarRepository.getFlashcardGrammarByCardGrammarId(cardId);
         flashcardGrammar.setStatus(4);
         flashcardGrammarRepository.save(flashcardGrammar);
    }
    @Override
    public void createFlashcardVocab(VocabDTO vocabDTO, User user) {
        validate.validateTerm(vocabDTO.getTerm());
        validate.validateMean(vocabDTO.getMean());
        FlashcardVocab flashcardVocab = FlashcardMapper.convertToFlashcardVocabEntity(vocabDTO,user);
        flashcardVocabRepository.save(flashcardVocab);

    }
    @Override
    public void createFlashcardVocabList(List<VocabDTO> vocabDTOs, User user) {
        for (VocabDTO dto : vocabDTOs) {
            validate.validateTerm(dto.getTerm());
            validate.validateMean(dto.getMean());
        }
        List<FlashcardVocab> entities = vocabDTOs.stream()
                .map((VocabDTO dto) -> FlashcardMapper.convertToFlashcardVocabEntity(dto,user))
                .collect(Collectors.toList());
        flashcardVocabRepository.saveAll(entities);

    }
    @Override
    public void updateVocabCard(VocabDTO vocabDTO, User user) {
        validate.validateTerm(vocabDTO.getTerm());
        validate.validateMean(vocabDTO.getMean());
        FlashcardVocab flashcardVocab = flashcardVocabRepository.getFlashcardVocabByCardVocabId(vocabDTO.getCardId());
        flashcardVocab.setStatus(vocabDTO.getStatus());
        flashcardVocab.setTerm(vocabDTO.getTerm());
        flashcardVocab.setMean(vocabDTO.getMean());
        flashcardVocab.setExample(vocabDTO.getExample());
        flashcardVocab.setExampleMean(vocabDTO.getExampleMean());
        flashcardVocab.setImgUrl(vocabDTO.getImgUrl());
        flashcardVocab.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        flashcardVocabRepository.save(flashcardVocab);
    }
// xu ly vocab
    @Override
    public void deleteFlvocab(long cardId) {
        FlashcardVocab flashcardVocab = flashcardVocabRepository.getFlashcardVocabByCardVocabId(cardId);
        flashcardVocab.setStatus(4);
        flashcardVocabRepository.save(flashcardVocab);
    }
    @Override
    public long numberCard(long setId, int type) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        List<Long> longs =flashcardSetAssociationRepository.findCardIdsByFlashcardSet(flashcardSet);
        //kanji
        if(type == 1){
            List<FlashcardKanji> flashcardKanjis = new ArrayList<>();
            for (Long card : longs){
                flashcardKanjis.add(flashcardKanjiRepository.getFlashcardKanjiByCardKanjiIdAndStatus(card,3));
            }
            return flashcardKanjis.size();
        }
        // tu vựng
        else if (type == 2){
            List<FlashcardVocab> flashcardVocabs = new ArrayList<>();
            for (Long card : longs){
                flashcardVocabs.add(flashcardVocabRepository.getFlashcardVocabByCardVocabIdAndStatus(card,3));
            }
            return flashcardVocabs.size();
        }
        // ngữ pháp
        else if (type == 3){
            List<FlashcardGrammar> flashcardGrammars = new ArrayList<>();
            for (Long card : longs){
                flashcardGrammars.add(flashcardGrammarRepository.getFlashcardGrammarByCardGrammarIdAndStatus(card,3));
            }
            return flashcardGrammars.size();
        }
        return 0;
    }
    @Override
    public List<SetSingleDTO> searchFlashcardSetPublic(String title) {
        if(title == null) title = "";
        List<FlashcardSet> flashcardSets = flashcardSetRepository.findAllByTitleContainingAndStatus(title,3);
        return flashcardSets.stream()
                .map(FlashcardMapper::convertSetSingleDTO)
                .collect(Collectors.toList());
    }
    @Override
    public ReadSetDTO readFlashcardSet(User user, long setId) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        if(flashcardSet == null ){
            throw new AppException(Error.INFO_NOT_FOUND);
        }
        OpenedFlashcardSet openedFlashcardSet = openedFlashcardSetRepository.getOpenedFlashcardSetByFlashcardSetAndUser(flashcardSet,user);
        if(openedFlashcardSet == null){
            openedFlashcardSet = new OpenedFlashcardSet();
            openedFlashcardSet.setFlashcardSet(flashcardSet);
            openedFlashcardSet.setUser(user);
            openedFlashcardSet.setOpenedAt(new Timestamp(System.currentTimeMillis()));
            openedFlashcardSetRepository.save(openedFlashcardSet);
        }else {
            openedFlashcardSet.setOpenedAt(new Timestamp(System.currentTimeMillis()));
            openedFlashcardSetRepository.save(openedFlashcardSet);
        }
        List<Card> cards = (List<Card>) getCardDTOSPublic(flashcardSet);
        List<ReadSetDTO.MarkedCard> markedCards = getCardBookmarkPublic(user,flashcardSet);
        List<ReadSetDTO.LearnedCard> learnedCards = getCardLearnPublic(user,flashcardSet);
        VotePoint votePoint = votePointRepository.getVotePointByFlashcardSetAndUser(flashcardSet, user);
        int voted = (votePoint != null) ? votePoint.getPoint() : 0;
        return ReadSetDTO.builder()
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .title(flashcardSet.getTitle())
                .description(flashcardSet.getDescription())
                .createdAt(flashcardSet.getCreatedAt())
                .type(flashcardSet.getType())
                .status(flashcardSet.getStatus())
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

    private List<ReadSetDTO.LearnedCard> getCardLearnPublic(User user, FlashcardSet flashcardSet) {
        List<Long> trackingProgresses = trackingProgressRepository.findDistinctCardIdsByUserAndFlashcardSet(user, flashcardSet);
        List<ReadSetDTO.LearnedCard> learnedCards = new ArrayList<>();

        for (Long cardId : trackingProgresses) {
            ReadSetDTO.LearnedCard learnedCard = createLearnedCard(cardId, flashcardSet.getType());
            learnedCards.add(learnedCard);
        }

        return learnedCards;
    }

    private ReadSetDTO.LearnedCard createLearnedCard(Long cardId, int flashcardType) {
        switch (flashcardType) {
            case 1:
                return ReadSetDTO.LearnedCard.builder()
                        .cardId(flashcardKanjiRepository.getFlashcardKanjiByCardKanjiIdAndStatus(cardId, 3).getCardKanjiId())
                        .build();
            case 2:
                return ReadSetDTO.LearnedCard.builder()
                        .cardId(flashcardVocabRepository.getFlashcardVocabByCardVocabIdAndStatus(cardId, 3).getCardVocabId())
                        .build();
            case 3:
                return ReadSetDTO.LearnedCard.builder()
                        .cardId(flashcardGrammarRepository.getFlashcardGrammarByCardGrammarIdAndStatus(cardId, 3).getCardGrammarId())
                        .build();
            default:
                throw new IllegalArgumentException("Unsupported flashcard type: " + flashcardType);
        }
    }


    public List<ReadSetDTO.MarkedCard> getCardBookmarkPublic(User user, FlashcardSet flashcardSet) {
        List<BookMarkCard> bookMarkCards = bookmarkCardRepository.getAllByUserAndAndFlashcardSet(user, flashcardSet);
        List<ReadSetDTO.MarkedCard> markedCards = new ArrayList<>();

        bookMarkCards.forEach(bookMarkCard -> {
            ReadSetDTO.MarkedCard markedCard = createMarkedCard(bookMarkCard, flashcardSet.getType());
            markedCards.add(markedCard);
        });

        return markedCards;
    }


    private ReadSetDTO.MarkedCard createMarkedCard(BookMarkCard bookMarkCard, int flashcardType) {
        ReadSetDTO.MarkedCard markedCard = ReadSetDTO.MarkedCard.builder()
                .bookMarkCardId(bookMarkCard.getBookMarkCardId())
                .userId(bookMarkCard.getUser().getUserId())
                .flashcardSetId(bookMarkCard.getFlashcardSet().getFlashcardSetId())
                .cardId(getCardIdBook(bookMarkCard, flashcardType))
                .build();

        return markedCard;
    }

    private long getCardIdBook(BookMarkCard bookMarkCard, int flashcardType) {
        switch (flashcardType) {
            case 1:
                return flashcardKanjiRepository.getFlashcardKanjiByCardKanjiIdAndStatus(bookMarkCard.getCardId(), 3).getCardKanjiId();
            case 2:
                return flashcardVocabRepository.getFlashcardVocabByCardVocabIdAndStatus(bookMarkCard.getCardId(), 3).getCardVocabId();
            case 3:
                return flashcardGrammarRepository.getFlashcardGrammarByCardGrammarIdAndStatus(bookMarkCard.getCardId(), 3).getCardGrammarId();
            default:
                throw new IllegalArgumentException("Unsupported flashcard type: " + flashcardType);
        }
    }


    public Collection<? extends Card> getCardDTOSPublic(FlashcardSet flashcardSet) {
        List<Card> cards = new ArrayList<>();
        List<FlashcardSetAssociation> flashcardSetAssociations = flashcardSetAssociationRepository.findAllByFlashcardSet(flashcardSet);

//                    "Kanji";
        if(flashcardSet.getType() == 1){
            List<FlashcardKanji> flashcardKanjis = new ArrayList<>();
            for (FlashcardSetAssociation flashcardSetAssociation : flashcardSetAssociations){
                FlashcardKanji flashcardKanji = flashcardKanjiRepository.getFlashcardKanjiByCardKanjiIdAndStatus(flashcardSetAssociation.getCardId(),3);
                flashcardKanjis.add(flashcardKanji);
            }
            List<KanjiDTO> kanjiDTOS = flashcardKanjis.stream()
                    .map((FlashcardKanji flashcardKanji) -> FlashcardMapper.convertKanjiDTO(flashcardKanji)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                    .collect(Collectors.toList());
            cards.addAll(kanjiDTOS);
        }
        //            "Từ vựng";
        else if(flashcardSet.getType() == 2){
            List<FlashcardVocab> flashcardVocabs = new ArrayList<>();
            for (FlashcardSetAssociation flashcardSetAssociation : flashcardSetAssociations){
                FlashcardVocab flashcardVocab = flashcardVocabRepository.getFlashcardVocabByCardVocabIdAndStatus(flashcardSetAssociation.getCardId(),3);
                flashcardVocabs.add(flashcardVocab);
            }
            List<VocabDTO> vocabDTOS =  flashcardVocabs.stream()
                    .map((FlashcardVocab flashcardVocab) -> FlashcardMapper.convertVocabDTO(flashcardVocab)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                    .collect(Collectors.toList());
            cards.addAll(vocabDTOS);

        }
//             "Ngữ pháp";
        else if(flashcardSet.getType() == 3){
            List<FlashcardGrammar> flashcardGrammars = new ArrayList<>();
            for (FlashcardSetAssociation flashcardSetAssociation : flashcardSetAssociations){
                FlashcardGrammar flashcardGrammar = flashcardGrammarRepository.getFlashcardGrammarByCardGrammarIdAndStatus(flashcardSetAssociation.getCardId(),3);
                flashcardGrammars.add(flashcardGrammar);
            }
            List<GrammarDTO> grammarDTOS= flashcardGrammars.stream()
                    .map((FlashcardGrammar flashcardGrammar) -> FlashcardMapper.convertGrammarDTO(flashcardGrammar)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                    .collect(Collectors.toList());
            cards.addAll(grammarDTOS);

        }
        return cards;
    }

    @Override
    public ReadSetDTO readFlashcardSetOfGuest(long setId) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
//                    "Kanji";
        List<Card> cards = (List<Card>) getCardDTOSPublic(flashcardSet);

        return ReadSetDTO.builder()
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .title(flashcardSet.getTitle())
                .description(flashcardSet.getDescription())
                .createdAt(flashcardSet.getCreatedAt())
                .type(flashcardSet.getType())
                .status(flashcardSet.getStatus())
                .numberCard(numberCard(flashcardSet.getFlashcardSetId(),flashcardSet.getType()))
                .votePoint(votePointService.countNumberVoteBySetId(flashcardSet.getFlashcardSetId()))
                .numberVote(votePointService.currentNumberVoteBySetId(flashcardSet.getFlashcardSetId()))
                .authDTO(UserMapper.toAuthDTO(flashcardSet.getUser()))
                .cards(cards)
                .build();
    }
    @Override
    public List<SetSingleDTO> listHistorySetOfUser(User user) {
        List<OpenedFlashcardSet> openedFlashcardSets = openedFlashcardSetRepository.findAllByUserAndFlashcardSet_StatusOrderByOpenedAtDesc(user,3);
        List<FlashcardSet> flashcardSets = new ArrayList<>();
        for (OpenedFlashcardSet openedFlashcardSet : openedFlashcardSets){
            flashcardSets.add(openedFlashcardSet.getFlashcardSet());
        }
        return flashcardSets.stream()
                .map(FlashcardMapper::convertSetSingleDTO)
                .collect(Collectors.toList());
    }
    @Override
    public List<SetSingleDTO> listBookMarkSetOfUser(User user) {
        List<BookMarkSet> bookMarkSets = bookmarkSetRepository.findAllByUserAndFlashcardSet_Status(user,3);
        List<FlashcardSet> flashcardSets = new ArrayList<>();
        for (BookMarkSet bookMarkSet : bookMarkSets){
            flashcardSets.add(bookMarkSet.getFlashcardSet());
        }
        return flashcardSets.stream()
                .map(FlashcardMapper::convertSetSingleDTO)
                .collect(Collectors.toList());
    }
    @Override
    public List<SetSingleDTO> listTop3VoteFlashcardSetPublic() {
        Pageable pageable = PageRequest.of(0, 3);
        List<FlashcardSet> flashcardSets = votePointRepository.findTop3SetsWithHighestAveragePoints(3,pageable);
        return flashcardSets.stream()
                .map(FlashcardMapper::convertSetSingleDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void voteFlashcardSet(User user, long setId, IdDTO idDTO) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        VotePoint votePoint = votePointRepository.getVotePointByFlashcardSetAndUser(flashcardSet,user);
        if (votePoint == null ){
            votePoint = new VotePoint();
            votePoint.setFlashcardSet(flashcardSet);
            votePoint.setUser(user);
            votePoint.setPoint((int) idDTO.getId());
        }else {
            votePoint.setPoint((int) idDTO.getId());
        }
        votePointRepository.save(votePoint);
    }



    @Override
    public List<GrammarDTO> listBankGrammarCard(User user) {
        List<FlashcardGrammar> flashcardGrammars = flashcardGrammarRepository.getAllByUser(user);
        List<GrammarDTO> grammarDTOS = new ArrayList<>();
        for (FlashcardGrammar flashcardGrammar : flashcardGrammars){
            grammarDTOS.add(FlashcardMapper.convertGrammarDTO(flashcardGrammar));
        }

        return grammarDTOS;
    }

    @Override
    public List<KanjiDTO> listBankKanjiCard(User user) {
        List<FlashcardKanji> flashcardKanjis = flashcardKanjiRepository.getAllByUser(user);
        List<KanjiDTO> kanjiDTOS = new ArrayList<>();
        for (FlashcardKanji flashcardKanji : flashcardKanjis){
            kanjiDTOS.add(FlashcardMapper.convertKanjiDTO(flashcardKanji));
        }
        return kanjiDTOS;
    }

    @Override
    public List<VocabDTO> listBankVocabCard(User user) {
        List<FlashcardVocab> flashcardVocabs = flashcardVocabRepository.getAllByUser(user);
        List<VocabDTO> vocabDTOS = new ArrayList<>();
        for (FlashcardVocab  flashcardVocab: flashcardVocabs){
            vocabDTOS.add(FlashcardMapper.convertVocabDTO(flashcardVocab));
        }
        return vocabDTOS;
    }

    @Override
    public void cloneCardGrammar(User user, List<GrammarDTO> grammarDTOS) {
            List<FlashcardGrammar> cloneGrammars = new ArrayList<>();
            for (GrammarDTO dto : grammarDTOS) {
                FlashcardGrammar cloneGrammar = FlashcardMapper.getFlashcardGrammar(dto, user);
                cloneGrammars.add(cloneGrammar);
            }
            flashcardGrammarRepository.saveAll(cloneGrammars);
    }

    @Override
    public void cloneCardKanji(User user, List<KanjiDTO> kanjiDTOS) {
        List<FlashcardKanji> cloneKanjis = new ArrayList<>();
        for (KanjiDTO dto : kanjiDTOS) {
            FlashcardKanji cloneKanji = FlashcardMapper.getFlashcardKanji(dto, user);
            cloneKanjis.add(cloneKanji);
        }
        flashcardKanjiRepository.saveAll(cloneKanjis);

    }

    @Override
    public void cloneCardVocab(User user, List<VocabDTO> vocabDTOS) {
            List<FlashcardVocab> cloneVocabs = new ArrayList<>();
            for (VocabDTO dto : vocabDTOS) {
                FlashcardVocab cloneVocab = FlashcardMapper.getFlashcardVocab(dto, user);
                cloneVocabs.add(cloneVocab);
            }
            flashcardVocabRepository.saveAll(cloneVocabs);
    }

    @Override
    public List<SetSingleDTO> listManagerSetOfUser(User user) {
        List<FlashcardSet> flashcardSets = flashcardSetRepository.getAllByUser(user);
        return flashcardSets.stream()
                .map(FlashcardMapper::convertSetSingleDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<SetSingleDTO> listSetOfUserPublic(User user) {
        List<FlashcardSet> flashcardSets = flashcardSetRepository.getAllByUserAndStatus(user,3);
        return flashcardSets.stream()
                .map(FlashcardMapper::convertSetSingleDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CardBankDTO listManagerBankCard(User user) {
        return CardBankDTO.builder()
                .vocabDTOS(listBankVocabCard(user))
                .kanjiDTOS(listBankKanjiCard(user))
                .grammarDTOS(listBankGrammarCard(user))
                .build();
    }

    @Override
    public Collection<? extends Card> listCardBankBySet(long setId, User user) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        List<Long> longs = flashcardSetAssociationRepository.findCardIdsByFlashcardSet(flashcardSet);
        List<Card> cards  = new ArrayList<>();
        if(flashcardSet.getType() == 1){
            List<FlashcardKanji> flashcardKanjis = flashcardKanjiRepository.getAllByUser(user);
            List<FlashcardKanji> inSet = new ArrayList<>();
            for (Long cardId : longs){
                FlashcardKanji flashcardKanji = flashcardKanjiRepository.getFlashcardKanjiByCardKanjiId(cardId);
                inSet.add(flashcardKanji);
            }
            flashcardKanjis.remove(inSet);
            List<KanjiDTO> kanjiDTOS = flashcardKanjis.stream()
                    .map((FlashcardKanji flashcardKanji) -> FlashcardMapper.convertKanjiDTO(flashcardKanji)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                    .collect(Collectors.toList());
            cards.addAll(kanjiDTOS);
        }
        //            "Từ vựng";
        else if(flashcardSet.getType() == 2){
            List<FlashcardVocab> flashcardVocabs = flashcardVocabRepository.getAllByUser(user);
            List<FlashcardVocab> inSet = new ArrayList<>();
            for (Long cardId : longs){
                FlashcardVocab flashcardVocab = flashcardVocabRepository.getFlashcardVocabByCardVocabId(cardId);
                inSet.add(flashcardVocab);
            }
            flashcardVocabs.remove(inSet);
            List<VocabDTO> vocabDTOS =  flashcardVocabs.stream()
                    .map((FlashcardVocab flashcardVocab) -> FlashcardMapper.convertVocabDTO(flashcardVocab)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                    .collect(Collectors.toList());
            cards.addAll(vocabDTOS);

        }
//             "Ngữ pháp";
        else if(flashcardSet.getType() == 3){
            List<FlashcardGrammar> flashcardGrammars = flashcardGrammarRepository.getAllByUser(user);
            List<FlashcardGrammar> inSet = new ArrayList<>();
            for (Long cardId : longs){
                FlashcardGrammar flashcardGrammar = flashcardGrammarRepository.getFlashcardGrammarByCardGrammarId(cardId);
                inSet.add(flashcardGrammar);
            }
            flashcardGrammars.remove(inSet);
            List<GrammarDTO> grammarDTOS= flashcardGrammars.stream()
                    .map((FlashcardGrammar flashcardGrammar) -> FlashcardMapper.convertGrammarDTO(flashcardGrammar)) // Sử dụng method reference để chuyển đổi từ User sang UserDTO
                    .collect(Collectors.toList());
            cards.addAll(grammarDTOS);

        }
        return cards;
    }

    @Override
    public Collection<? extends Card> listCardInSet(long setId, User user) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        List<Card> cards  = new ArrayList<>();
        if(flashcardSet.getType() == 1){
            List<KanjiDTO> kanjiDTOS = getKanjiDTOS(flashcardSet);
            cards.addAll(kanjiDTOS);
        }
        //            "Từ vựng";
        else if(flashcardSet.getType() == 2){
            List<VocabDTO> vocabDTOS =  getVocabDTOS(flashcardSet);
            cards.addAll(vocabDTOS);

        }
//             "Ngữ pháp";
        else if(flashcardSet.getType() == 3){
            List<GrammarDTO> grammarDTOS= getGrammarDTOS(flashcardSet);
            cards.addAll(grammarDTOS);

        }
        return cards;
    }

    @Override
    public void addCardInSet(User user, long setId, DataCardIdDto dto) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        List<Long> dataList = dto.getData();
        for (Long longs : dataList){
            FlashcardSetAssociation association = new FlashcardSetAssociation();
            association.setFlashcardSet(flashcardSet);
            association.setCardId(longs);
            flashcardSetAssociationRepository.save(association);
        }
    }

    @Override
    public void deleteCardInSet(long setId, User user, long cardId) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        FlashcardSetAssociation association = flashcardSetAssociationRepository.getFlashcardSetAssociationByFlashcardSetAndCardId(flashcardSet,cardId);
        flashcardSetAssociationRepository.delete(association);
    }


}
