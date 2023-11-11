package com.example.jflashcardsv0_9.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class HomeDTO {
    long numberUser;
    long numberFLCard;
    long numberClass;
    // lớp nhiều học sinh nhất
    List<ClassRoom> classRoom;
    // học nhiều nhất
    List<SetSingleDTO> setLearn;
    // có điểm vote cao nhất
    List<SetSingleDTO> setVote;
    // 3 người học chăm nhất
    List<User> userTop;
    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class ClassRoom {
        String classRoomName;
        String description;
        long numberMember;
        AuthDTO teacher;
    }
    @Getter
    @Setter
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class User {
        String userName;
        long numberSet;
    }
}
