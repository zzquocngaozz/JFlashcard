package com.example.jflashcardsv0_9.dto;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClassPostDTO {
    Long classPostId;
    String content;
    Timestamp createdAt;
    Long classRoomId; // Thay thế bằng ClassRoomDTO để đại diện cho lớp
    List<CommentDTO> comments;
    AuthDTO creator; // Sử dụng UserDTO thay vì User
}





