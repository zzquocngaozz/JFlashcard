package com.example.jflashcardsv0_9.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TrackingDTOResponse {
    long classId;
    long setId;
    List<Data> onTracking;
    List<Data> behind;
    List<Data> lazy;
    // trạng thái "học đúng tiến độ"
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
