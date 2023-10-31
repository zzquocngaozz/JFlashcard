package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.entities.BookMarkCard;
import com.example.jflashcardsv0_9.entities.BookMarkSet;
import com.example.jflashcardsv0_9.entities.FlashcardSet;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.exception.Validate;
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
    @Autowired
    Validate validate;
    @Override
    public void bookMarkSet(User user, long setId) {
        validate.checkExistsSet(setId);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        BookMarkSet bookMarkSet = bookmarkSetRepository.getBookMarkSetByUserAndFlashcardSet(user,flashcardSet);
        if(bookMarkSet == null){
            bookMarkSet = new BookMarkSet();
            bookMarkSet.setUser(user);
            bookMarkSet.setFlashcardSet(flashcardSet);
            bookmarkSetRepository.save(bookMarkSet);
        }else {
            bookmarkSetRepository.delete(bookMarkSet);
        }
    }

    @Override
    public void bookMarkCard(User user, long setId, long cardId) {
        validate.checkExistsSetAndCard(setId,cardId);
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        BookMarkCard bookMarkCard = bookmarkCardRepository.getBookMarkCardByUserAndFlashcardSetAndCardId(user,flashcardSet,cardId);
        if(bookMarkCard == null){
            bookMarkCard = new BookMarkCard();
            bookMarkCard.setUser(user);
            bookMarkCard.setFlashcardSet(flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId));
            bookMarkCard.setCardId(cardId);
            bookmarkCardRepository.save(bookMarkCard);
        }else {
            bookmarkCardRepository.delete(bookMarkCard);
        }

    }
}
