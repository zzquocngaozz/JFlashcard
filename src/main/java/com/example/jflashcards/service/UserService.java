package com.example.jflashcards.service;

import com.example.jflashcards.entities.User;
import com.example.jflashcards.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User getUserByUserId(Integer id) {
        return userRepository.getUserByUserId(id);
    }
    public User getUserByUserName(String userName) {
        return userRepository.getUserByUserName(userName);
    }
    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    public List<User> findAllUser() {
        return userRepository.findAll();
    }

//    public User registerUser(User user) {
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        return userRepository.save(user);
//    }
//    public User loginUser(String username, String password) {
//        User user = userRepository.getUserByUserName(username);
//        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
//            return user;
//        }
//        return null;
//    }



}
