package com.example.jflashcardsv0_9.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Date;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class WeekTrackingDTO {
    long flashcardSetId;
    long userId;
    Date startDate;
    Date endDate;
}
