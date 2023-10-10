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
import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author Admin
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "flashcardset")
@Entity
public class FlashcardSet implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flashcardSetId")
    private Long flashcardSetId; // Trường primary key

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "imgUrl")
    private String imgUrl;

    @Column(name = "createdAt")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date createdAt;

    @Column(name = "isprivate",columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isPrivate = false ;

    @Column(name = "setType")
    private int setType;

    @ManyToOne // Mối quan hệ nhiều flashcardset đến một User
    @JoinColumn(name = "user") // Đặt tên cột foreign key là "user_id"
    private User user;
//    public String getRoleString(){
//        if(setType == 1){
//            return "Kanji";
//        }else if (setType ==2) {
//            return "Từ vựng";
//        }else if (setType ==3) {
//            return "Ngữ pháp";
//        }
//        return "";
//    }
}
