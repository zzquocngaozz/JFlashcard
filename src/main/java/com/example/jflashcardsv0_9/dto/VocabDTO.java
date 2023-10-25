package com.example.jflashcardsv0_9.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class VocabDTO {
    Long cardId;
    String term;
    String mean;
    String example;
    String exampleMean;
    String imgUrl;
    Long flashcardSetId;
}
