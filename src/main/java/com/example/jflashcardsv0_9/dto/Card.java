package com.example.jflashcardsv0_9.dto;

public interface Card {
    // Đặc tả (specify) các phương thức cần thiết
    Long getCardId();
    String getTerm();
    String getMean();
    String getExample();
    String getExampleMean();
    String getImgUrl();
    Long getFlashcardSetId();
    // Các phương thức khác nếu cần

}
