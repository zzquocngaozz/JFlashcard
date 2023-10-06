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
@Table(name = "comment")
@Entity
public class Comment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commentId")
    private Long commentId; // Trường primary key

    @Column(name = "content")
    private String content;

    @Column(name = "createdAt")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date createdAt;

    @ManyToOne // Mối quan hệ nhiều Comment đến một ClassPost
    @JoinColumn(name = "postId") // Đặt tên cột foreign key là "class_id"
    private ClassPost classPost;

    @ManyToOne // Mối quan hệ nhiều Comment đến một User
    @JoinColumn(name = "userId") // Đặt tên cột foreign key là "class_id"
    private User user;
}
