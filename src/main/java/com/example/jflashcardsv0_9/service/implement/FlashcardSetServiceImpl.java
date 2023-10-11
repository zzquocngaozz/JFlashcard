package com.example.jflashcardsv0_9.service.implement;
import com.example.jflashcardsv0_9.dto.FlashcardSetDTO;
import com.example.jflashcardsv0_9.entities.Role;
import com.example.jflashcardsv0_9.service.FlashcardSetService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FlashcardSetServiceImpl implements FlashcardSetService {
    @Override
    public FlashcardSetDTO createFlashcardSet(FlashcardSetDTO flashcardSetDTO) {

        return flashcardSetDTO; // Trả về null nếu không tìm thấy roleName
    }
}
