package com.example.jflashcardsv0_9.mapper;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.*;
import com.example.jflashcardsv0_9.repository.FlashcardKanjiRepository;
import com.example.jflashcardsv0_9.repository.FlashcardSetRepository;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import com.example.jflashcardsv0_9.service.VotePointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Component
public class FlashcardMapper {

    static FlashcardSetRepository flashcardSetRepository;
    static VotePointService votePointService;
    static FlashcardSetService flashcardSetService;
    @Autowired
    public FlashcardMapper(FlashcardSetRepository flashcardSetRepository,VotePointService votePointService,FlashcardSetService flashcardSetService) {
        this.flashcardSetRepository = flashcardSetRepository;
        this.votePointService = votePointService;
        this.flashcardSetService = flashcardSetService;
    }

    public  static SetSingleDTO convertSetSingleDTO(FlashcardSet flashcardSet){
        return SetSingleDTO.builder()
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .title(flashcardSet.getTitle())
                .description(flashcardSet.getDescription())
                .createdAt(flashcardSet.getCreatedAt())
                .type(flashcardSet.getType())
                .isPrivate(flashcardSet.isPrivate())
                .numberCard(flashcardSetService.numberCard(flashcardSet.getFlashcardSetId(),flashcardSet.getType()))
                .votePoint(votePointService.countNumberVoteBySetId(flashcardSet.getFlashcardSetId()))
                .numberVote(votePointService.currentNumberVoteBySetId(flashcardSet.getFlashcardSetId()))
                .authDTO(UserMapper.toAuthDTO(flashcardSet.getUser()))
                .build();
    }

    public static FlashcardSet convertFlS(FlashcardSetDTORequest flashcardSetDTORequest, User user){
        return FlashcardSet.builder()
                .title(flashcardSetDTORequest.getTitle())
                .description(flashcardSetDTORequest.getDescription())
                .isPrivate(flashcardSetDTORequest.isPrivate())
                .createdAt(new Date(System.currentTimeMillis()))
                .type(flashcardSetDTORequest.getType())
                .user(user)
                .build();
    }

    public static GrammarDTO convertGrammarDTO(FlashcardGrammar flashcardGrammar,FlashcardSet flashcardSet){
        return GrammarDTO.builder()
                .cardId(flashcardGrammar.getCardGrammarId())
                .combination(flashcardGrammar.getCombination())
                .note(flashcardGrammar.getNote())
                .term(flashcardGrammar.getTerm())
                .mean(flashcardGrammar.getMean())
                .example(flashcardGrammar.getExample())
                .exampleMean(flashcardGrammar.getExampleMean())
                .imgUrl(flashcardGrammar.getImgUrl())
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .build();
    }

    public static KanjiDTO convertKanjiDTO(FlashcardKanji flashcardKanji,FlashcardSet flashcardSet){
        return KanjiDTO.builder()
                .cardId(flashcardKanji.getCardKanjiId())
                .onSound(flashcardKanji.getOnSound())
                .kunSound(flashcardKanji.getKunSound())
                .chineseSound(flashcardKanji.getChineseSound())
                .term(flashcardKanji.getTerm())
                .mean(flashcardKanji.getMean())
                .example(flashcardKanji.getExample())
                .exampleMean(flashcardKanji.getExampleMean())
                .imgUrl(flashcardKanji.getImgUrl())
                .trick(flashcardKanji.getTrick())
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .build();
    }
    public static VocabDTO convertVocabDTO(FlashcardVocab flashcardVocab,FlashcardSet flashcardSet){
        return VocabDTO.builder()
                .cardId(flashcardVocab.getCardVocabId())
                .term(flashcardVocab.getTerm())
                .mean(flashcardVocab.getMean())
                .example(flashcardVocab.getExample())
                .exampleMean(flashcardVocab.getExampleMean())
                .imgUrl(flashcardVocab.getImgUrl())
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .build();
    }

    public  static FlashcardSetDTOResponse convertFlashcardSetDTOResponse(FlashcardSet flashcardSet){
        return FlashcardSetDTOResponse.builder()
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .title(flashcardSet.getTitle())
                .description(flashcardSet.getDescription())
                .type(flashcardSet.getType())
                .isPrivate(flashcardSet.isPrivate())
                .authDTO(UserMapper.toAuthDTO(flashcardSet.getUser()))
                .build();
    }
    public static FlashcardKanji convertToFlashcardKanjiEntity(KanjiDTO dto,long setId) {
        return FlashcardKanji.builder()
                .cardKanjiId(dto.getCardId())
                .onSound(dto.getOnSound())
                .kunSound(dto.getKunSound())
                .chineseSound(dto.getChineseSound())
                .term(dto.getTerm())
                .mean(dto.getMean())
                .example(dto.getExample())
                .exampleMean(dto.getExampleMean())
                .imgUrl(dto.getImgUrl())
                .trick(dto.getTrick())
                .flashcardSet(flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId))
                .build();
    }
    public static FlashcardVocab convertToFlashcardVocabEntity(VocabDTO dto,long setId) {
        return FlashcardVocab.builder()
                .cardVocabId(dto.getCardId())
                .term(dto.getTerm())
                .mean(dto.getMean())
                .example(dto.getExample())
                .exampleMean(dto.getExampleMean())
                .imgUrl(dto.getImgUrl())
                .flashcardSet(flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId))
                .build();
    }
    public static FlashcardGrammar convertToFlashcardGrammarEntity(GrammarDTO dto,long setId) {
        return FlashcardGrammar.builder()
                .cardGrammarId(dto.getCardId())
                .combination(dto.getCombination())
                .note(dto.getNote())
                .term(dto.getTerm())
                .mean(dto.getMean())
                .example(dto.getExample())
                .exampleMean(dto.getExampleMean())
                .imgUrl(dto.getImgUrl())
                .flashcardSet(flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId))
                .build();
    }


}
