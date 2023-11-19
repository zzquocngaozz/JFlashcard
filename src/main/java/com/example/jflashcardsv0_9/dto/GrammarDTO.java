package com.example.jflashcardsv0_9.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class GrammarDTO implements Card {
    Long cardId;
    int status;
    String combination;
    String note;
    String term;
    String mean;
    String example;
    String exampleMean;
    String imgUrl;
    // Getter và Setter cho các thuộc tính
    // Các getter và setter cho các thuộc tính khác
}
