package com.example.jflashcardsv0_9.service;

import com.example.jflashcardsv0_9.entities.ChatMessage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ChatService {
    void sendMessage(ChatMessage message);
    List<ChatMessage> getChatHistory(Long senderId, Long recipientId);
}
