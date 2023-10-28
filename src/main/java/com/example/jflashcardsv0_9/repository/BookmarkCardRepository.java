package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.BookMarkCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkCardRepository extends JpaRepository<BookMarkCard,Long> {
    BookMarkCard save(BookMarkCard bookMarkCard);
}
