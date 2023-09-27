package com.example.jflashcards.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
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
@Table(name = "classmember")
@Entity
//@IdClass(ClassMemberId.class) // Sử dụng lớp ClassMemberId để đại diện cho composite primary key
public class ClassMember implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "classmember_id")
    private Long classMemberId; // Trường primary key

    @ManyToOne // Mối quan hệ nhiều ClassMember đến một Classroom
    @JoinColumn(name = "class_id") // Đặt tên cột foreign key là "class_id"
    private ClassRoom classroom;

    @ManyToOne // Mối quan hệ nhiều ClassMember đến một User
    @JoinColumn(name = "user_id") // Đặt tên cột foreign key là "user_id"
    private User user;

}
