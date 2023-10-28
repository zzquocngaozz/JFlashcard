package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.BookMarkCard;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkCardRepository extends JpaRepository<BookMarkCard,Long> {
    BookMarkCard save(BookMarkCard bookMarkCard);

    List<BookMarkCard> getAllByUserAndAndFlashcardSet(User user, FlashcardSet flashcardSet);
}
