package com.example.jflashcardsv0_9.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DashBoardDTO {
    long numberUser;
    long numberFLCard;
    long numberClass;
    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class Set {
        String classRoomName;
        String description;
        long numberMember;
        AuthDTO teacher;
    }
}
