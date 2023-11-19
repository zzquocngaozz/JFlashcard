package com.example.jflashcardsv0_9.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
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
    @ManyToOne
    @JoinColumn(name = "userId") // Tên cột khoá ngoại trong bảng FlashcardKanji
    private User user;
}
