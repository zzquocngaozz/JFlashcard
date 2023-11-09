package com.example.jflashcardsv0_9;

import com.example.jflashcardsv0_9.dto.RegisterDTO;
import com.example.jflashcardsv0_9.entities.Role;
import com.example.jflashcardsv0_9.exception.AppException;
import com.example.jflashcardsv0_9.exception.Error;
import com.example.jflashcardsv0_9.repository.RoleRepository;
import com.example.jflashcardsv0_9.repository.UserRepository;
import com.example.jflashcardsv0_9.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.text.SimpleDateFormat;
import java.sql.Date;


@SpringBootApplication
public class JFlashcardsV09Application implements CommandLineRunner{

    public static void main(String[] args) {
        SpringApplication.run(JFlashcardsV09Application.class, args);
    }
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @Override
    public  void run(String... arg) throws Exception{
        if (roleRepository.findRoleByName("ROLE_LEARNER") == null) {
            Role role = new Role();
            role.setName("ROLE_LEARNER");
            roleRepository.save(role);
        }

        if (roleRepository.findRoleByName("ROLE_TEACHER") == null) {
            Role role = new Role();
            role.setName("ROLE_TEACHER");
            roleRepository.save(role);
        }

        if (roleRepository.findRoleByName("ROLE_ADMIN") == null) {
            Role role = new Role();
            role.setName("ROLE_ADMIN");
            roleRepository.save(role);
        }
        RegisterDTO registerDTO = RegisterDTO.builder()
                .userName("Admin")
                .password("Qwer1234")
                .email("admin@example.com")
                .birth(Date.valueOf("2001-12-12"))
                .firstName("hoang")
                .lastName("hieu")
                .build();
        if(userRepository.existsByEmail(registerDTO.getEmail()) == false){
            userService.registrationADMIN(registerDTO);
        }
//         Create a BCryptPasswordEncoder
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
//        // Password to encode
//        String rawPassword = "Qwer1234";
//
//        // Encode the password
//        String encodedPassword = passwordEncoder.encode(rawPassword);
//
//        System.out.println("Encoded Password: " + encodedPassword);
    }

}
