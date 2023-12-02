package com.example.jflashcardsv0_9.dto;
//ham de hien thi info set
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Date;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class SetSingleDTO {
    long flashcardSetId;
    String title;
    String description;
    int type;
    Date createdAt;
    Date publicAt;
    int  status;
    long numberCard;
    float votePoint;
    long numberVote;
    AuthDTO authDTO;
}
