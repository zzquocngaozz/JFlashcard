package com.example.jflashcardsv0_9.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "flashcardGrammar")
@Entity
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
    @ManyToOne
    @JoinColumn(name = "flashcardSetId") // Tên cột khoá ngoại trong bảng FlashcardKanji
    private FlashcardSet flashcardSet;
}
