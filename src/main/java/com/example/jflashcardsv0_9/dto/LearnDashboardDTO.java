package com.example.jflashcardsv0_9.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class LearnDashboardDTO {
    WeekTrackingDTOResponse weekTrackingDTOResponse;
    long countClass;
    long countFolder;
    DataType setType;
    Data dataSet;
    DataType cardType;
    Data dataCard;
    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class Data {
        long numberDraft;
        long numberDone;
        long numberPublic;
        long numberClose;
    }
    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class DataType {
        long numberKanji;
        long numberVocab;
        long numberGrammar;

    }
}
