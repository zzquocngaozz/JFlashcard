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
                .status(flashcardSet.getStatus())
                .numberCard(flashcardSetService.numberCard(flashcardSet.getFlashcardSetId(),flashcardSet.getType()))
                .votePoint(votePointService.countNumberVoteBySetId(flashcardSet.getFlashcardSetId()))
                .numberVote(votePointService.currentNumberVoteBySetId(flashcardSet.getFlashcardSetId()))
                .authDTO(UserMapper.toAuthDTO(flashcardSet.getUser()))
                .build();
    }
    public  static SetSingleDTO convertSetSingleDTOManager(FlashcardSet flashcardSet){
        return SetSingleDTO.builder()
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .title(flashcardSet.getTitle())
                .description(flashcardSet.getDescription())
                .createdAt(flashcardSet.getCreatedAt())
                .type(flashcardSet.getType())
                .status(flashcardSet.getStatus())
                .numberCard(flashcardSetService.numberCardManager(flashcardSet.getFlashcardSetId(),flashcardSet.getType()))
                .votePoint(votePointService.countNumberVoteBySetId(flashcardSet.getFlashcardSetId()))
                .numberVote(votePointService.currentNumberVoteBySetId(flashcardSet.getFlashcardSetId()))
                .authDTO(UserMapper.toAuthDTO(flashcardSet.getUser()))
                .build();
    }

    public static FlashcardSet convertFlS(FlashcardSetDTORequest flashcardSetDTORequest, User user){
        return FlashcardSet.builder()
                .status(1)
                .title(flashcardSetDTORequest.getTitle())
                .description(flashcardSetDTORequest.getDescription())
                .createdAt(new Date(System.currentTimeMillis()))
                .type(flashcardSetDTORequest.getType())
                .user(user)
                .build();
    }

    public static GrammarDTO convertGrammarDTO(FlashcardGrammar flashcardGrammar){
        return GrammarDTO.builder()
                .cardId(flashcardGrammar.getCardGrammarId())
                .status(flashcardGrammar.getStatus())
                .combination(flashcardGrammar.getCombination())
                .note(flashcardGrammar.getNote())
                .term(flashcardGrammar.getTerm())
                .mean(flashcardGrammar.getMean())
                .example(flashcardGrammar.getExample())
                .exampleMean(flashcardGrammar.getExampleMean())
                .imgUrl(flashcardGrammar.getImgUrl())
                .creatAt(flashcardGrammar.getCreatedAt())
                .build();
    }

    public static KanjiDTO convertKanjiDTO(FlashcardKanji flashcardKanji){
        return KanjiDTO.builder()
                .cardId(flashcardKanji.getCardKanjiId())
                .status(flashcardKanji.getStatus())
                .onSound(flashcardKanji.getOnSound())
                .kunSound(flashcardKanji.getKunSound())
                .chineseSound(flashcardKanji.getChineseSound())
                .term(flashcardKanji.getTerm())
                .mean(flashcardKanji.getMean())
                .example(flashcardKanji.getExample())
                .exampleMean(flashcardKanji.getExampleMean())
                .imgUrl(flashcardKanji.getImgUrl())
                .trick(flashcardKanji.getTrick())
                .creatAt(flashcardKanji.getCreatedAt())
                .build();
    }
    public static VocabDTO convertVocabDTO(FlashcardVocab flashcardVocab){
        return VocabDTO.builder()
                .cardId(flashcardVocab.getCardVocabId())
                .status(flashcardVocab.getStatus())
                .term(flashcardVocab.getTerm())
                .mean(flashcardVocab.getMean())
                .example(flashcardVocab.getExample())
                .exampleMean(flashcardVocab.getExampleMean())
                .imgUrl(flashcardVocab.getImgUrl())
                .creatAt(flashcardVocab.getCreatedAt())
                .build();
    }

    public  static FlashcardSetDTOResponse convertFlashcardSetDTOResponse(FlashcardSet flashcardSet){
        return FlashcardSetDTOResponse.builder()
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .title(flashcardSet.getTitle())
                .description(flashcardSet.getDescription())
                .type(flashcardSet.getType())
                .status(flashcardSet.getStatus())
                .authDTO(UserMapper.toAuthDTO(flashcardSet.getUser()))
                .build();
    }
    public static FlashcardKanji convertToFlashcardKanjiEntity(KanjiDTO dto,User user) {
        return FlashcardKanji.builder()
                .cardKanjiId(dto.getCardId())
                .status(1)
                .onSound(dto.getOnSound())
                .kunSound(dto.getKunSound())
                .chineseSound(dto.getChineseSound())
                .term(dto.getTerm())
                .mean(dto.getMean())
                .example(dto.getExample())
                .exampleMean(dto.getExampleMean())
                .imgUrl(dto.getImgUrl())
                .trick(dto.getTrick())
                .createdAt(new Timestamp(System.currentTimeMillis()))

                .user(user)
                .build();
    }
    public static FlashcardVocab convertToFlashcardVocabEntity(VocabDTO dto,User user) {
        return FlashcardVocab.builder()
                .cardVocabId(dto.getCardId())
                .status(1)

                .term(dto.getTerm())
                .mean(dto.getMean())
                .example(dto.getExample())
                .exampleMean(dto.getExampleMean())
                .imgUrl(dto.getImgUrl())
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .user(user)
                .build();
    }
    public static FlashcardGrammar convertToFlashcardGrammarEntity(GrammarDTO dto,User user) {
        return FlashcardGrammar.builder()
                .cardGrammarId(dto.getCardId())
                .status(1)
                .combination(dto.getCombination())
                .note(dto.getNote())
                .term(dto.getTerm())
                .mean(dto.getMean())
                .example(dto.getExample())
                .exampleMean(dto.getExampleMean())
                .imgUrl(dto.getImgUrl())
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .user(user)
                .build();
    }
    public static FlashcardVocab getFlashcardVocab(VocabDTO dto, User user) {
        FlashcardVocab cloneVocab = new FlashcardVocab();
        // Sao chép các trường dữ liệu khác nếu cần
        cloneVocab.setTerm(dto.getTerm());
        cloneVocab.setMean(dto.getMean());
        cloneVocab.setExample(dto.getExample());
        cloneVocab.setExampleMean(dto.getExampleMean());
        cloneVocab.setImgUrl(dto.getImgUrl());
        cloneVocab.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        // Gán flashcardSet mới cho cloneVocab
        cloneVocab.setUser(user);
        return cloneVocab;
    }
    public static FlashcardGrammar getFlashcardGrammar(GrammarDTO dto, User user) {
        FlashcardGrammar cloneGrammar = new FlashcardGrammar();

        // Sao chép các trường dữ liệu khác nếu cần
        cloneGrammar.setCombination(dto.getCombination());
        cloneGrammar.setNote(dto.getNote());
        cloneGrammar.setTerm(dto.getTerm());
        cloneGrammar.setMean(dto.getMean());
        cloneGrammar.setExample(dto.getExample());
        cloneGrammar.setExampleMean(dto.getExampleMean());
        cloneGrammar.setImgUrl(dto.getImgUrl());
        cloneGrammar.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        // Gán flashcardSet mới cho cloneVocab
        cloneGrammar.setUser(user);
        return cloneGrammar;
    }
    public static FlashcardKanji getFlashcardKanji(KanjiDTO dto, User user) {
        FlashcardKanji cloneKanji = new FlashcardKanji();

        // Sao chép các trường dữ liệu khác nếu cần
        cloneKanji.setOnSound(dto.getOnSound());
        cloneKanji.setKunSound(dto.getKunSound());
        cloneKanji.setChineseSound(dto.getChineseSound());
        cloneKanji.setTerm(dto.getTerm());
        cloneKanji.setMean(dto.getMean());
        cloneKanji.setExample(dto.getExample());
        cloneKanji.setExampleMean(dto.getExampleMean());
        cloneKanji.setImgUrl(dto.getImgUrl());
        cloneKanji.setTrick(dto.getTrick());
        cloneKanji.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        // Gán flashcardSet mới cho cloneVocab
        cloneKanji.setUser(user);
        return cloneKanji;
    }


}
