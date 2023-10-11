package com.example.jflashcardsv0_9.dto;
import com.example.jflashcardsv0_9.entities.FlashcardGrammar;
import com.example.jflashcardsv0_9.entities.FlashcardKanji;
import com.example.jflashcardsv0_9.entities.FlashcardVocab;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class FlashcardSetDTOResponse {
    long flashcardSetId;
    String title;
    String description;
    int setType;
    boolean isPrivate;
    AuthDTO authDTO;
    List<GrammarDTO> grammarDTOS;
    List<KanjiDTO> kanjiDTOS;
    List<VocabDTO> vocabDTOS;
}