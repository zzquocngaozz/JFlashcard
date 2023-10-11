package com.example.jflashcardsv0_9.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Date;
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class FlashcardSetDTO {
    Long flashcardSetId;
    String title;
    String description;
    String imgUrl;
    Date createdAt;
    boolean isPrivate;
    int setType;
    UserDTO user;
    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GrammarDTO {
        Long cardGrammarId;
        String combination;
        String note;
        String term;
        String mean;
        String example;
        String exampleMean;
        String imgUrl;
        Long flashcardSetId;
        // Getter và Setter cho các thuộc tính
        // Các getter và setter cho các thuộc tính khác
    }
    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    @AllArgsConstructor
    @NoArgsConstructor
    public static class VocabDTO {
        Long cardVocabId;
        String term;
        String mean;
        String example;
        String exampleMean;
        String imgUrl;
        Long flashcardSetId;
    }
    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    @AllArgsConstructor
    @NoArgsConstructor
    public static class KanjiDTO {
        Long cardKanjiId;
        String onSound;
        String kunSound;
        String chineseSound;
        String term;
        String mean;
        String example;
        String exampleMean;
        String imgUrl;
        Long flashcardSetId;
    }

}

