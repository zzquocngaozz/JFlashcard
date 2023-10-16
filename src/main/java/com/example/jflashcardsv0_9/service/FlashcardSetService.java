package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.dto.*;

import java.util.List;

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
    void updateKanjiCard(KanjiDTO kanjiDTO, long userID, long setId);
    void deleteFlKanji(long cardId);
    // card grammar
    GrammarDTO createFlashcardGrammar(GrammarDTO grammarDTO, long userID);

    void deleteFlGrammar(long cardId);

    // card vocab
    VocabDTO createFlashcardVocab(VocabDTO vocabDTO, long userID);

    void deleteFlvocab(long cardId);



}
