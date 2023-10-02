package com.example.jflashcards.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
//import jakarta.persistence.*;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * @author Admin
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "classroom")
@Entity
public class ClassRoom implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "classroom_id")
    private Long classRoomId;

    @Column(name = "classroom_name")
    private String classRoomName;

    @Column(name = "classroom_code",unique = true)
    private String classRoomCode;

    @Column(name = "created_at")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date createdAt;

    @ManyToOne // Đây là mối quan hệ nhiều Class đến một User
    @JoinColumn(name = "teacher_id") // Đặt tên cột foreign key là "teacher_id"
    private User teacherID;




}
