package com.example.jflashcardsv0_9.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Admin
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "trackingProgress")
public class TrackingProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trackingProgressId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "flashcardSetId")
    private FlashcardSet flashcardSet;

    @Column(name = "cardId")
    private int cardId;
}
