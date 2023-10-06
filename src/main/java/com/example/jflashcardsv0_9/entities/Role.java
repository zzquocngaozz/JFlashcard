package com.example.jflashcardsv0_9.entities;

//import javax.persistence.*;
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
@Table(name = "role")
public class Role implements Serializable {
    @Id
    @GeneratedValue
    @Column(name = "roleId")
    private Integer roleId;

    @Column(name = "roleName")
    private String name;

    @Override
    public String toString() {
        return this.name;
    }
}
