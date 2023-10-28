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
    Date createdAt;
    boolean isPrivate;
    boolean isBookMarked;
    long numberCard;
    float votePoint;
    long numberVote;
    AuthDTO authDTO;

    List<Card> cards;
    List<LearnedCard> learnedCards;
    List<MarkedCard> markedCards;


    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class LearnedCard {
        long trackingProgressId;
        long cardId;
        long userId;
        long flashcardSetId;
        Timestamp createdAt;
        Timestamp lastLearn;
    }

    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class MarkedCard {
        long bookMarkCardId;
        long userId;
        long flashcardSetId;
        long cardId;
    }
}
