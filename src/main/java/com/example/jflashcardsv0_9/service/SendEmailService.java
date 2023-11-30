package com.example.jflashcardsv0_9.service;

import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;

@Service
public interface SendEmailService {

    public void sendEmail(String to, String subject, String body);

    public void sendVerifyToken(String email,String token);

    public void sendOTPToken(String email, String token);

    public void sendChangeRole(String email);
    public void sendOnTrackEmail(String email, String userName,String setName,String classname) ;
    public void sendBehindScheduleEmail(String email, String userName,String setName,String classname) ;
    public void sendLazyEmail(String email, String userName,String setName,String classname) ;
    public void sendAcceptEmail(String email, String userName, String setName, Timestamp publicAt, String des) ;
    public void sendRejectedEmail(String email, String userName, String setName, Timestamp publicAt, String des,String reason) ;


    void sendMailAccount(String email, String name, String password);
}
