package com.example.jflashcards.service;

import com.example.jflashcards.entities.User;
import com.example.jflashcards.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUserByUserId(Integer id) {
        return userRepository.getUserByUserId(id);
    }
    public User getUserByUserName(String userName) {
        return userRepository.getUserByUserName(userName);
    }
    public List<User> findAllUser() {
        return userRepository.findAll();
    }

}
