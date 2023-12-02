package com.example.jflashcardsv0_9.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "bookMarkCard")
@Entity
@Builder
public class BookMarkCard implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookMarkCardId")
    private Long bookMarkCardId; // Trường primary key

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    // Một BookmarkSet chỉ liên quan đến một FlashcardSet
    @ManyToOne
    @JoinColumn(name = "flashcardSetId")
    private FlashcardSet flashcardSet;

    @Column(name = "cardId")
    private long cardId;
}
