package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.entities.ChatMessage;
import com.example.jflashcardsv0_9.service.ChatService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatServiceImpl implements ChatService {
    @Override
    public void sendMessage(ChatMessage message) {

    }

    @Override
    public List<ChatMessage> getChatHistory(Long senderId, Long recipientId) {
        return null;
    }
}
