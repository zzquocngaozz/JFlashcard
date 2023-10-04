package com.example.jflashcards.entities;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;
//import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Admin
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "users")
@Entity
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "gender")
    private int gender;

    @Column(name = "birth")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date birth;

    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
            joinColumns =@JoinColumn(name = "user_id"),
            inverseJoinColumns =@JoinColumn(name = "role_id"))
    private Set<Role> roleList = new HashSet<>();

    public void setRoles(Role role) {
        this.roleList.add(role);
    }


    @Column(name = "islooked",columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isLooked = false ;

    @Column(name = "isverify",columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isVerify = false;

    public String getGenderString(){
        if(gender ==1){
            return "Male";
        }else if (gender ==0) {
            return "Female";
        }
        return "";
    }
    public void setBirth(String birthDateStr) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        Date birth = dateFormat.parse(birthDateStr);
        this.birth = birth;
    }
}
