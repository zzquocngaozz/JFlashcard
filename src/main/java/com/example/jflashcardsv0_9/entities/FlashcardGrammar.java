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
@Table(name = "flashcardGrammar")
@Entity
@Builder
public class FlashcardGrammar implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cardGrammarId")
    private Long cardGrammarId;
    @Column(name = "combination")
    private String combination;
    @Column(name = "note")
    private String note;
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
    @Column(name = "status", columnDefinition = "INT DEFAULT 1")
    private int  status ;
    @Column(name = "createdAt")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Timestamp createdAt;
    @Column(name = "isverify",columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isVerify ;
    @ManyToOne
    @JoinColumn(name = "userId") // Tên cột khoá ngoại trong bảng FlashcardKanji
    private User user;
}
