package com.example.jflashcards.service;

import com.example.jflashcards.entities.Role;
import com.example.jflashcards.entities.User;
import com.example.jflashcards.repository.RoleRepository;
import com.example.jflashcards.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    public List<User> findAllUser() {
        return userRepository.findAll();
    }
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }
    @Transactional
    public User createUserWithRoles(User user, String roleName) {
        // Kiểm tra và thêm các vai trò từ danh sách roleNames
        Role role = roleRepository.findByName(roleName);
        // Gán danh sách vai trò vào đối tượng User
        user.setRoles(role);
        // Lưu đối tượng User vào cơ sở dữ liệu
        return userRepository.save(user);
    }



}
