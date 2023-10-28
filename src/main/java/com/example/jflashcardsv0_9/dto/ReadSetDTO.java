package com.example.jflashcardsv0_9.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.sql.Date;
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
    public static class Card {
        int cardId;
        String onSound;
        String kunSound;
        String chineseSound;
        String term;
        String mean;
        String example;
        String exampleMean;
        String imgUrl;
        String trick;
        int flashcardSetId;
    }

    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class LearnedCard {
        int trackingProgressId;
        int cardId;
        int userId;
        int flashcardSetId;
        long createdAt;
        long lastLearn;
    }

    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class MarkedCard {
        int bookMarkCardId;
        int userId;
        int flashcardSetId;
        int cardId;
    }
}
