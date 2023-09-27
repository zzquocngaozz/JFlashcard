package com.example.jflashcards.controller;

import com.example.jflashcards.security.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api")
public class EmailController {

    @Autowired
    private EmailService emailService;


    @GetMapping("/email-sender")
    public String sendEmail() {
        String to = "mygpt013@gmail.com";
        String subject = "Hello, world!";
        String body = "This is a greeting for you";

        emailService.sendEmail(to, subject, body);

        return "Send email success!";
    }

    @GetMapping("/email")
    public String greeting() {


        return "Hello world";
    }


}
