package com.example.jflashcardsv0_9.service;

import org.springframework.stereotype.Service;

@Service
public interface VotePointService {
    long currentNumberVoteBySetId(long setId);

    float countNumberVoteBySetId(long setId);
}
