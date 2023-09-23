package com.example.jflashcards.entities;

/*import javax.persistence.*;*/
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Admin
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role implements Serializable {
    @Id
    @GeneratedValue
    private Integer role_id;
    @Column(name = "role_name")
    private String name;

    @ManyToMany(mappedBy = "roleList")
    private Set<User> userList = new HashSet<>();

    @Override
    public String toString() {
        return this.name;
    }
}

