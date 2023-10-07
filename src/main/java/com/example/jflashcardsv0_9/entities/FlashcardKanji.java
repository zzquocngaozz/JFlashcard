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
@Table(name = "flashcardKanji")
@Entity
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
    @ManyToOne
    @JoinColumn(name = "flashcardSetId") // Tên cột khoá ngoại trong bảng FlashcardKanji
    private FlashcardSet flashcardSet;
}
