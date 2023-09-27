package com.example.jflashcards;

import com.example.jflashcards.entities.User;
import com.example.jflashcards.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JFlashcardsApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(JFlashcardsApplication.class, args);
    }
    @Autowired
    private UserRepository userRepository;
    @Override
    public void run(String... arg) throws Exception{
        /*User user = new User();
        user.setUserName("huu");
        user.setPassword("123456789");
        user.setEmail("huuuu@gmail.com");
        user.setFirstName("do");
        user.setLastName("huu");
        user.setPhone("0123456789");
        user.setGender(1);
        user.setBirth("23-06-2001");
        userRepository.save(user);
        User user1 = new User();
        user1.setUserName("hieu");
        user1.setPassword("123456789");
        user1.setEmail("hieuu@gmail.com");
        user1.setFirstName("hoang");
        user1.setLastName("hieu");
        user1.setPhone("0124456789");
        user1.setGender(1);
        user1.setBirth("12-6-2001");
        userRepository.save(user1);*/
    }

}
