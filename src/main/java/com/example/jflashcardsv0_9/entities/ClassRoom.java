package com.example.jflashcardsv0_9.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
//import javax.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

/**
 * @author Admin
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "classroom")
@Entity
@Builder
public class ClassRoom implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "classRoomId")
    private Long classRoomId;

    @Column(name = "classRoomName")
    private String classRoomName;

    @Column(name = "description")
    private String description;

    @Column(name = "classRoomCode",unique = true)
    private String classRoomCode;

    @Column(name = "createdAt")
    @JsonFormat(pattern = "dd-MM-yyyy")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date createdAt;

    @ManyToOne(fetch  = FetchType.LAZY) // Đây là mối quan hệ nhiều Class đến một User
    @JoinColumn(name = "teacherId") // Đặt tên cột foreign key là "teacher_id"
    private User teacher;

    @OneToMany(mappedBy = "classroom", cascade = CascadeType.ALL)
    private List<ClassMember> classMember;

    @OneToMany(mappedBy = "classroom", cascade = CascadeType.ALL)
    private List<ClassPost> classPost;

    @OneToMany(mappedBy = "classRoom", cascade = CascadeType.ALL)
    private List<ClassSet> classSets;

}
