package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public interface FlashcardSetService {
    IdDTO createFlashcardSet(FlashcardSetDTORequest flashcardSetDTORequest, long userID);
    FlashcardSetDTOResponse viewFlashcardSetResponse(long setid,long userid);
    FlashcardSetDTOResponse updateFlashcardSetResponse(FlashcardSetDTORequest flashcardSetDTORequest,long setid,long userid);
//    updateFlashcardSet
    List<KanjiDTO> findAllKanjiDTOBySetId(long setid,long userid) ;
    List<GrammarDTO> findAllGrammarDTOBySetId(long setid,long userid) ;
    List<VocabDTO> findAllVocabDTOBySetId(long setid,long userid) ;
    void deleteFlashcardSetById(long setid,long userid);

    // card kanji
    KanjiDTO createFlashcardKanji(KanjiDTO kanjiDTO, long userID, long setId);
    List<KanjiDTO> createFlashcardKanjiList(List<KanjiDTO> kanjiDTOs, long userID, long setId);
    void updateKanjiCard(KanjiDTO kanjiDTO, long userID, long setId);
    void deleteFlKanji(long cardId);
    // card grammar
    GrammarDTO createFlashcardGrammar(GrammarDTO grammarDTO, long userID, long setId);
    List<GrammarDTO> createFlashcardGrammarList(List<GrammarDTO> grammarDTOs, long userID, long setId);
    void updateGrammarCard(GrammarDTO grammarDTO, long userID, long setId);

    void deleteFlGrammar(long cardId);

    // card vocab
    VocabDTO createFlashcardVocab(VocabDTO vocabDTO, long userID, long setId);
    List<VocabDTO> createFlashcardVocabList(List<VocabDTO> vocabDTOs, long userID, long setId);
    void updateVocabCard(VocabDTO vocabDTO, long userID, long setId);

    void deleteFlvocab(long cardId);

    // tính count cua các card bang type
    long numberCard(long setId,int type);

    List<SetSingleDTO> searchFlashcardSetPublic(String title);
    ReadSetDTO readFlashcardSet(User user, long setId);

    List<SetSingleDTO> listSetOfUser(User user);
}
