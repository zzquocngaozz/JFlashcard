package com.example.jflashcardsv0_9.entities;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
//import javax.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Admin
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "folderSet")
@Entity
@Builder
public class FolderSet implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "folderId")
    private Long folderId; // Trường primary key

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "createdAt")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date createdAt;

    @ManyToOne // Mối quan hệ nhiều ClassMember đến một User
    @JoinColumn(name = "userId") // Đặt tên cột foreign key là "user_id"
    private User user;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "folderSet_flashcardSet",
            joinColumns = @JoinColumn(name = "folderId"),
            inverseJoinColumns = @JoinColumn(name = "flashcardSetId")
    )
    private Set<FlashcardSet> flashcardSets= new HashSet<>();

}
