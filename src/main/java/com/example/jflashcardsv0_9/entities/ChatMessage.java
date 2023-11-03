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
@Table(name = "chatmessage")
@Entity
@Builder
public class ChatMessage implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatMessageId")
    private Long chatMessageId;
    // người gửi
    @ManyToOne
    @JoinColumn(name = "userId")
    private User sender;
    // người rep
    @ManyToOne
    @JoinColumn(name = "teacherId")
    private User recipient;

    @ManyToOne
    @JoinColumn(name = "classId")
    private ClassRoom classId;

    private String content;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Timestamp timestamp;

    private boolean isRead;
}
