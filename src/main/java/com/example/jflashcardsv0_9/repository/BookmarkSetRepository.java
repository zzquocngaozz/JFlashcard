package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.BookMarkSet;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkSetRepository extends JpaRepository<BookMarkSet,Long> {
    BookMarkSet save(BookMarkSet bookMarkSet);
    BookMarkSet getBookMarkSetByUserAndFlashcardSet(User user, FlashcardSet flashcardSet);
    boolean existsBookMarkSetByUserAndAndFlashcardSet(User user, FlashcardSet flashcardSet);

}
