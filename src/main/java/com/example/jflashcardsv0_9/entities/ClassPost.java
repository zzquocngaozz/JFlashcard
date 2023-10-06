package com.example.jflashcardsv0_9.entities;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
//import javax.persistence.*;
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
    @Column(name = "classPostId")
    private Long classPostId; // Trường primary key

    @Column(name = "content")
    private String content;

    @Column(name = "downloadUrl")
    private String downloadUrl;

    @Column(name = "createdAt")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date createdAt;

    @ManyToOne // Mối quan hệ nhiều ClassPost đến một Classroom
    @JoinColumn(name = "classId") // Đặt tên cột foreign key là "class_id"
    private ClassRoom classroom;

    @ManyToOne // Mối quan hệ nhiều ClassPost đến một User
    @JoinColumn(name = "creatorId") // Đặt tên cột foreign key là "class_id"
    private User user;
}
