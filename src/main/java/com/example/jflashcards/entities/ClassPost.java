package com.example.jflashcards.entities;
import com.fasterxml.jackson.annotation.JsonFormat;
//import jakarta.persistence.*;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * @author Admin
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "classpost")
@Entity
public class ClassPost implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "classpost_id")
    private Long classPostId; // Trường primary key

    @Column(name = "content")
    private String content;

    @Column(name = "download_url")
    private String downloadUrl;

    @Column(name = "created_at")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date createdAt;

    @ManyToOne // Mối quan hệ nhiều ClassPost đến một Classroom
    @JoinColumn(name = "class_id") // Đặt tên cột foreign key là "class_id"
    private ClassRoom classroom;

    @ManyToOne // Mối quan hệ nhiều ClassPost đến một User
    @JoinColumn(name = "creator_id") // Đặt tên cột foreign key là "class_id"
    private User user;
}
