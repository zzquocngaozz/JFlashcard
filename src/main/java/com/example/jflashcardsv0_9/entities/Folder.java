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
import java.util.List;

/**
 * @author Admin
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "folder")
@Entity

public class Folder implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "folderId")
    private Long folderId; // Trường primary key

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @ManyToOne // Mối quan hệ nhiều ClassMember đến một User
    @JoinColumn(name = "userId") // Đặt tên cột foreign key là "user_id"
    private User user;

    @OneToMany(mappedBy = "folder")
    private List<FolderSet> folderSets;

}
