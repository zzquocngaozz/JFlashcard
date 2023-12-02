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
public class CommentDTO {
    Long commentId;
    String content;
    Timestamp createdAt;
    Long classPostId; // Thay thế bằng ClassRoomDTO để đại diện cho lớp
    AuthDTO creator; // Sử dụng UserDTO thay vì User
}
