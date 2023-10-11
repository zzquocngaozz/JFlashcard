package com.example.jflashcardsv0_9.service;

import org.springframework.stereotype.Service;

@Service
public interface SendEmailService {

    public void sendEmail(String to, String subject, String body);

    public void sendVerifyToken(String email,String token);

    public void sendOTPToken(String email, String token);

    public void sendChangeRole(String email);

}
