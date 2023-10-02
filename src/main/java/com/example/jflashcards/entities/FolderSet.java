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
@Table(name = "folderset")
@Entity
public class FolderSet implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "folderset_id")
    private Long folderSetId; // Trường primary key

    @Column(name = "created_at")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date createdAt;

    @ManyToOne // Mối quan hệ nhiều folderset  đến một folder
    @JoinColumn(name = "folder_id") // Đặt tên cột foreign key là "user_id"
    private Folder folder;

    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(name = "floder_flashcardset",
            joinColumns =@JoinColumn(name = "folderset_id"),
            inverseJoinColumns =@JoinColumn(name = "flashcardset_id"))
    private Set<FlashcardSet> flashcardSets = new HashSet<>();
}
