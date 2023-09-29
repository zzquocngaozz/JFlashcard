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
    @Column(name = "flashcardset_id")
    private Long flashcardSetId; // Trường primary key

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "img_url")
    private String imgUrl;

    @Column(name = "created_at")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date createdAt;

    @Column(name = "isprivate",columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isPrivate = false ;

    @Column(name = "set_type")
    private int setType;

    @ManyToOne // Mối quan hệ nhiều flashcardset đến một User
    @JoinColumn(name = "creator_id") // Đặt tên cột foreign key là "user_id"
    private User user;

    @ManyToMany(mappedBy = "flashcardSets")
    private Set<FolderSet> folderSets = new HashSet<>();

    public String getRoleString(){
        if(setType ==1){
            return "Kanji";
        }else if (setType ==2) {
            return "Vocabulary";
        }else if (setType ==3) {
            return "Grammar";
        }
        return "";
    }
}
