package com.example.jflashcardsv0_9.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "flashcardKanji")
@Entity
@Builder
public class FlashcardKanji implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cardKanjiId")
    private Long cardKanjiId;
    @Column(name = "onSound")
    private String onSound;
    @Column(name = "kunSound")
    private String kunSound;
    @Column(name = "chineseSound")
    private String chineseSound;
    @Column(name = "term")
    private String term;
    @Column(name = "mean")
    private String mean;
    @Column(name = "example")
    private String example;
    @Column(name = "exampleMean")
    private String exampleMean;
    @Column(name = "imgUrl")
    private String imgUrl;
    @Column(name = "trick")
    private String trick;
    @Column(name = "status", columnDefinition = "INT DEFAULT 1")
    private int  status ;
    @Column(name = "createdAt")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Timestamp createdAt;
    @ManyToOne
    @JoinColumn(name = "userId") // Tên cột khoá ngoại trong bảng FlashcardKanji
    private User user;
}
