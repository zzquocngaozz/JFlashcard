package com.example.jflashcardsv0_9.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "userLog")
public class UserLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "logId")
    private Long logId; // Trường primary key

    @Column(name = "createdAt")
    private int activityType;

    @Column(name = "description")
    private String description;

    @Column(name = "logAt")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Timestamp logAt;

    @ManyToOne
    @JoinColumn( name = "user_id")
    private User user;
}
