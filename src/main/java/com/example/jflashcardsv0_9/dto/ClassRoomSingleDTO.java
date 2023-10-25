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
@ToString
public class ClassRoomSingleDTO {
    long classRoomId;
    String classRoomName;
    String classRoomCode;
    String description;
    Date createdAt;
    long numberSet;
    long numberMember;
    AuthDTO teacher;
}