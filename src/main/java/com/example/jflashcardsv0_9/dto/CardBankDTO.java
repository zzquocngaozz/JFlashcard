package com.example.jflashcardsv0_9.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class CardBankDTO {
    List<KanjiDTO> kanjiDTOS;
    List<GrammarDTO> grammarDTOS;
    List<VocabDTO> vocabDTOS;
}
