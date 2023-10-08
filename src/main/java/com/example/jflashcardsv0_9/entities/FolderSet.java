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
    @Column(name = "folderSetId")
    private Long folderSetId; // Trường primary key

    @Column(name = "createdAt")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date createdAt;

    @ManyToOne // Mối quan hệ nhiều folderset  đến một folder
    @JoinColumn(name = "folder") // Đặt tên cột foreign key là "user_id"
    private Folder folder;

    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(name = "floderflashcardset",
            joinColumns =@JoinColumn(name = "foldersetId"),
            inverseJoinColumns =@JoinColumn(name = "flashcardsetId"))
    private Set<FlashcardSet> flashcardSets = new HashSet<>();
}
