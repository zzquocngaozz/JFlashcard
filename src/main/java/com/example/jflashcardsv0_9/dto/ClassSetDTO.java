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
@ToString
public class ClassSetDTO {
    long classSetId;
    Timestamp startAt;
    Timestamp dueAt;
    long classRoomId;
    long flashcardSetId;
    String title;
    int status;
    int type;
    long numberCard;
    AuthDTO authDTO;
}
