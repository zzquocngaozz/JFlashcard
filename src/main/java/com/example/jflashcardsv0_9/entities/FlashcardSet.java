package com.example.jflashcardsv0_9.entities;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
//import javax.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
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
@Table(name = "flashcardSet")
@Entity
@Builder
public class FlashcardSet implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flashcardSetId")
    private Long flashcardSetId; // Trường primary key

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "createdAt")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date createdAt;

    @Column(name = "status", columnDefinition = "INT DEFAULT 1")
    private int  status ;

    @Column(name = "type")
    private int type;
    @Column(name = "publicAt")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Timestamp publicAt;

    @ManyToOne // Mối quan hệ nhiều flashcardset đến một User
    @JoinColumn(name = "user") // Đặt tên cột foreign key là "user_id"
    private User user;
    @OneToMany(mappedBy = "flashcardSet", cascade = CascadeType.ALL)
    private List<BookMarkSet> bookMarkSets;
    @OneToMany(mappedBy = "flashcardSet", cascade = CascadeType.ALL)
    private List<OpenedFlashcardSet> openedFlashcardSets;
    @OneToMany(mappedBy = "flashcardSet", cascade = CascadeType.ALL)
    private List<BookMarkCard> bookMarkCards;
    @OneToMany(mappedBy = "flashcardSet", cascade = CascadeType.ALL)
    private List<VotePoint> votePoints;
    @OneToMany(mappedBy = "flashcardSet", cascade = CascadeType.ALL)
    private List<ClassSet>  classSets;
    @OneToMany(mappedBy = "flashcardSet", cascade = CascadeType.ALL)
    private List<TrackingProgress> trackingProgresses;
    @ManyToMany(mappedBy = "flashcardSets")
    private Set<FolderSet> folderSets = new HashSet<>();
    @PreRemove
    private void preRemove() {
        // Xóa liên kết với FolderSet mà không xóa FolderSet
        folderSets.forEach(folderSet -> folderSet.getFlashcardSets().remove(this));
    }
}
