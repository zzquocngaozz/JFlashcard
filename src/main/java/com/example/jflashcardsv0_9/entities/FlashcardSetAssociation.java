package com.example.jflashcardsv0_9.entities;


import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "flashcardSetAssociation")
@Entity
@Builder
public class FlashcardSetAssociation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "associationId")
    private Long associationId;
    @ManyToOne
    @JoinColumn(name = "flashcardSetId")
    private FlashcardSet flashcardSet;

    @Column(name = "cardId")
    private long cardId ;

}
