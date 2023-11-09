package com.example.jflashcardsv0_9.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "chatMessage")
@Entity
@Builder
public class ChatMessage implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatMessageId")
    private Long chatMessageId;

    private String content;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Timestamp timestamp;

    private boolean isRead;

    // người gửi
    @ManyToOne
    @JoinColumn(name = "sender")
    private User sender;
    // người rep
    @ManyToOne
    @JoinColumn(name = "recipient")
    private User recipient;

    @ManyToOne
    @JoinColumn(name = "classId")
    private ClassRoom classRoom;
}
