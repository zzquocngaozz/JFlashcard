package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.entities.BookMarkCard;
import com.example.jflashcardsv0_9.entities.BookMarkSet;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.repository.BookmarkCardRepository;
import com.example.jflashcardsv0_9.repository.BookmarkSetRepository;
import com.example.jflashcardsv0_9.repository.FlashcardSetRepository;
import com.example.jflashcardsv0_9.service.BookmarkService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookmarkServiceImpl implements BookmarkService {
    @Autowired
    BookmarkSetRepository bookmarkSetRepository;
    @Autowired
    FlashcardSetRepository flashcardSetRepository;
    @Autowired
    BookmarkCardRepository bookmarkCardRepository;
    @Override
    public void bookMarkset(User user, long setId) {
        BookMarkSet bookMarkSet = null;
        bookMarkSet.setUser(user);
        bookMarkSet.setFlashcardSet(flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId));
        bookmarkSetRepository.save(bookMarkSet);
    }

    @Override
    public void bookMarkCard(User user, long setId, long cardId) {
        BookMarkCard bookMarkCard = null;
        bookMarkCard.setUser(user);
        bookMarkCard.setFlashcardSet(flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId));
        bookMarkCard.setCardId(cardId);
        bookmarkCardRepository.save(bookMarkCard);

    }
}
