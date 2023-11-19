package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public interface FlashcardSetService {
    List<KanjiDTO> getKanjiDTOS(long setId);

    List<VocabDTO> getVocabDTOS(long setId);

    List<GrammarDTO> getGrammarDTOS(long setId);

    IdDTO createFlashcardSet(FlashcardSetDTORequest flashcardSetDTORequest, long userID);
    FlashcardSetDTOResponse viewFlashcardSetResponse(long setid,long userid);
    FlashcardSetDTOResponse updateFlashcardSetResponse(FlashcardSetDTORequest flashcardSetDTORequest,long setid,long userid);
//    updateFlashcardSet
    List<KanjiDTO> findAllKanjiDTOBySetId(long setid,long userid) ;
    List<GrammarDTO> findAllGrammarDTOBySetId(long setid,long userid) ;
    List<VocabDTO> findAllVocabDTOBySetId(long setid,long userid) ;
    void deleteFlashcardSetById(long setid,long userid);

    // card kanji
    void createFlashcardKanji(KanjiDTO kanjiDTO, User user);
    void createFlashcardKanjiList(List<KanjiDTO> kanjiDTOs, User user);
    void updateKanjiCard(KanjiDTO kanjiDTO, User user);
    void deleteFlKanji(long cardId);
    // card grammar
    void createFlashcardGrammar(GrammarDTO grammarDTO, User user);
    void createFlashcardGrammarList(List<GrammarDTO> grammarDTOs, User user);
    void updateGrammarCard(GrammarDTO grammarDTO, User user);

    void deleteFlGrammar(long cardId);

    // card vocab
    void createFlashcardVocab(VocabDTO vocabDTO, User user);
    void createFlashcardVocabList(List<VocabDTO> vocabDTOs, User user);
    void updateVocabCard(VocabDTO vocabDTO, User user);

    void deleteFlvocab(long cardId);

    // tính count cua các card bang type
    long numberCard(long setId,int type);

    List<SetSingleDTO> searchFlashcardSetPublic(String title);
    ReadSetDTO readFlashcardSet(User user, long setId);

    List<SetSingleDTO> listSetOfUser(User user);

    ReadSetDTO readFlashcardSetOfGuest(long setId);

    List<SetSingleDTO> listHistorySetOfUser(User user);

    List<SetSingleDTO> listBookMarkSetOfUser(User user);

    List<SetSingleDTO> listTop3VoteFlashcardSetPublic();

    void voteFlashcardSet(User user, long setId, IdDTO idDTO);

    List<GrammarDTO> listBankGrammarCard(User user);

    List<KanjiDTO> listBankKanjiCard(User user);

    List<VocabDTO> listBankVocabCard(User user);

    void cloneCardGrammar(User user, List<GrammarDTO> grammarDTOS);

    void cloneCardKanji(User user, List<KanjiDTO> kanjiDTOS);

    void cloneCardVocab(User user, List<VocabDTO> vocabDTOS);

    List<SetSingleDTO> listManagerSetOfUser(User user);

    List<SetSingleDTO> listSetOfUserPublic(User user);

    CardBankDTO listManagerBankCard(User user);
}
