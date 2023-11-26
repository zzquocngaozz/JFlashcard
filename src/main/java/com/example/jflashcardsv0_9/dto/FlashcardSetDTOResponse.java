package com.example.jflashcardsv0_9.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Date;
import java.sql.Timestamp;


@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class FlashcardSetDTOResponse {
    long flashcardSetId;
    String title;
    String description;
    Date createdAt;
    int type;
    int  status;
    Timestamp publicAt;
    AuthDTO authDTO;
}
