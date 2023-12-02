package com.example.jflashcardsv0_9.entities;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
//import javax.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * @author Admin
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "classSet")
@Entity
@Builder
public class ClassSet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "classSetId")
    private Long classSetId; // Trường primary key

    @Column(name = "createdAt")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Timestamp createdAt;

    @Column(name = "dueAt")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Timestamp dueAt;

    @ManyToOne // Mối quan hệ nhiều Comment đến một User
    @JoinColumn(name = "classId") // Đặt tên cột foreign key là "class_id"
    private ClassRoom classRoom;

    @ManyToOne // Mối quan hệ nhiều Comment đến một User
    @JoinColumn(name = "setId") // Đặt tên cột foreign key là "class_id"
    private FlashcardSet flashcardSet;


}
