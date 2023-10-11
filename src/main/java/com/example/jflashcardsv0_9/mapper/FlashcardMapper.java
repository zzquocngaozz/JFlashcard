package com.example.jflashcardsv0_9.mapper;

import com.example.jflashcardsv0_9.dto.*;
import com.example.jflashcardsv0_9.entities.*;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Component
public class FlashcardMapper {
    public static FlashcardSet convertFlS(FlashcardSetDTORequest flashcardSetDTORequest, User user){
        return FlashcardSet.builder()
                .title(flashcardSetDTORequest.getTitle())
                .description(flashcardSetDTORequest.getDescription())
                .isPrivate(flashcardSetDTORequest.isPrivate())
                .createdAt(new Date(System.currentTimeMillis()))
                .setType(flashcardSetDTORequest.getType())
                .user(user)
                .build();
    }

    public static GrammarDTO convertGrammarDTO(FlashcardGrammar flashcardGrammar,FlashcardSet flashcardSet){
        return GrammarDTO.builder()
                .cardGrammarId(flashcardGrammar.getCardGrammarId())
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
                .flashcardSetId(flashcardKanji.getCardKanjiId())
                .onSound(flashcardKanji.getOnSound())
                .kunSound(flashcardKanji.getKunSound())
                .chineseSound(flashcardKanji.getChineseSound())
                .term(flashcardKanji.getTerm())
                .mean(flashcardKanji.getMean())
                .example(flashcardKanji.getExample())
                .exampleMean(flashcardKanji.getExampleMean())
                .imgUrl(flashcardKanji.getImgUrl())
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .build();
    }
    public static VocabDTO convertVocabDTO(FlashcardVocab flashcardVocab,FlashcardSet flashcardSet){
        return VocabDTO.builder()
                .cardVocabId(flashcardVocab.getCardVocabId())
                .term(flashcardVocab.getTerm())
                .mean(flashcardVocab.getMean())
                .example(flashcardVocab.getExample())
                .exampleMean(flashcardVocab.getExampleMean())
                .imgUrl(flashcardVocab.getImgUrl())
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .build();
    }

    public  static FlashcardSetDTOResponse convertFlashcardSetDTOResponse(
            FlashcardSet flashcardSet, User user, List<GrammarDTO> grammarDTOS, List<KanjiDTO> kanjiDTOS, List<VocabDTO> vocabDTOS
            ){
        return FlashcardSetDTOResponse.builder()
                .flashcardSetId(flashcardSet.getFlashcardSetId())
                .title(flashcardSet.getTitle())
                .description(flashcardSet.getDescription())
                .setType(flashcardSet.getSetType())
                .isPrivate(flashcardSet.isPrivate())
                .authDTO(UserMapper.toAuthDTO(user))
                .grammarDTOS(grammarDTOS)
                .kanjiDTOS(kanjiDTOS)
                .vocabDTOS(vocabDTOS)
                .build();
    }


}
