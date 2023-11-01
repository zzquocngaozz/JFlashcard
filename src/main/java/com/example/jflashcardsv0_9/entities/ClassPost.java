package com.example.jflashcardsv0_9.entities;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
//import javax.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

/**
 * @author Admin
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "classpost")
@Entity
@Builder
public class ClassPost implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "classPostId")
    private Long classPostId; // Trường primary key

    @Column(name = "content")
    private String content;

    @Column(name = "downloadUrl")
    private String downloadUrl;

    @Column(name = "createdAt")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Timestamp createdAt;

    @ManyToOne // Mối quan hệ nhiều ClassPost đến một Classroom
    @JoinColumn(name = "classId") // Đặt tên cột foreign key là "class_id"
    private ClassRoom classroom;

    @ManyToOne // Mối quan hệ nhiều ClassPost đến một User
    @JoinColumn(name = "creatorId") // Đặt tên cột foreign key là "class_id"
    private User user;

    @OneToMany(mappedBy = "classPost", cascade = CascadeType.REMOVE)
    List<Comment> commentList;
}
