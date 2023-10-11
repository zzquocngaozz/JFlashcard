package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.service.SendEmailService;
import com.example.jflashcardsv0_9.util.RandomTokenUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SendEmailServiceImpl implements SendEmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendEmail(String to, String subject, String body) {
        System.out.println("send roi");
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        javaMailSender.send(message);

    }

    @Override
    public void sendVerifyToken(String email,String token) {
        sendEmail(email,"Mã xác nhận tài khoản", "Đây là mã xác nhận tài khoản của bạn. " +
                "Đừng chia sẻ với bất kỳ ài: "+ token
                +" .Mã sẽ có hiệu lực trong vòng 15 phút");
    }

    @Override
    public void sendOTPToken(String email,String token) {
        sendEmail(email,"Mã đổi mật khẩu", "Đây là mã mã đổi mật khẩu của bạn. " +
                "Đừng chia sẻ với bất kỳ ài: "+ token
                +". Mã sẽ có hiệu lực trong vòng 15 phút");
    }

    @Override
    public void sendChangeRole(String email) {

    }
}
