package com.example.jflashcardsv0_9.service;

public interface VotePointService {
    long currentNumberVoteBySetId(long setId);

    float countNumberVoteBySetId(long setId);
}
