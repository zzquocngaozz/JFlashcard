package com.example.jflashcardsv0_9.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
//import javax.persistence.*;
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
    @Column(name = "classRoomId")
    private Long classRoomId;

    @Column(name = "classRoomName")
    private String classRoomName;

    @Column(name = "classRoomCode",unique = true)
    private String classRoomCode;

    @Column(name = "createdAt")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date createdAt;

    @ManyToOne // Đây là mối quan hệ nhiều Class đến một User
    @JoinColumn(name = "teacherId") // Đặt tên cột foreign key là "teacher_id"
    private User teacherID;




}
