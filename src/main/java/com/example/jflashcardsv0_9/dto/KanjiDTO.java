package com.example.jflashcardsv0_9.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class KanjiDTO implements Card {
    Long cardId;
    int status;
    boolean verified;

    String onSound;
    String kunSound;
    String chineseSound;
    String term;
    String mean;
    String example;
    String exampleMean;
    String imgUrl;
    String trick;
    Timestamp creatAt;

}
