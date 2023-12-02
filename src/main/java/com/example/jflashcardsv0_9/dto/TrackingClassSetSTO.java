package com.example.jflashcardsv0_9.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.List;
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TrackingClassSetSTO {
    long flashcardSetId;
    String title;
    Timestamp startDate;
    Timestamp dueDate;
    long numberCards;
    List<Data> data;

    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class Data {
        long userId;
        String userName;
        String email;
        long numberLearned;
    }
}
