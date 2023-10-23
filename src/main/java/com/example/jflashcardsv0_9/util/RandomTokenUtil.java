package com.example.jflashcardsv0_9.util;

import java.security.SecureRandom;
import java.util.Date;

public class RandomTokenUtil {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int TOKEN_LENGTH = 8;

    public static String generateToken() {
        SecureRandom random = new SecureRandom();
        StringBuilder token = new StringBuilder(TOKEN_LENGTH);

        for (int i = 0; i < TOKEN_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            token.append(randomChar);
        }

        return token.toString();
    }

    public static boolean checkExpire(Date expireAt) {
        Date currentTime = new Date(); // Lấy thời gian hiện tại
        return currentTime.after(expireAt); // Kiểm tra xem currentTime có sau expireAt không
    }
}
