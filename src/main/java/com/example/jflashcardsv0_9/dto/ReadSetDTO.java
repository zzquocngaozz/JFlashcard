package com.example.jflashcardsv0_9.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReadSetDTO {
    long flashcardSetId;
    String title;
    String description;
    int type;
    Timestamp publicAt;
    Date createdAt;
    int status;
    boolean isBookMarked;
    long numberCard;
    int voted;
    float votePoint;
    long numberVote;
    AuthDTO authDTO;

    List<Card> cards;
    List<Data> learnedCards;
    List<Data> markedCards;


    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class Data {
        long cardId;
    }
}
