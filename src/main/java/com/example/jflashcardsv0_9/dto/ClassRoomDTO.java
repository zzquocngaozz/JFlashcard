package com.example.jflashcardsv0_9.dto;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Date; // Sửa từ java.sql.Date thành java.util.Date

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClassRoomDTO {
    Long classRoomId;
    String classRoomName;
    String classRoomCode;
    String description;
    Date createdAt;
    AuthDTO teacher; // Sửa tên trường từ teacherID thành teacherId
}
