package com.example.jflashcardsv0_9.entities;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
//import javax.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author Admin
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "flashcardVocab")
@Entity
@Builder
public class FlashcardVocab implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cardVocabId")
    private Long cardVocabId;
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
