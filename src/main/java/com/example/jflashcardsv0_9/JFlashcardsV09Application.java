package com.example.jflashcardsv0_9;

import com.example.jflashcardsv0_9.dto.RegisterDTO;
import com.example.jflashcardsv0_9.entities.Role;
import com.example.jflashcardsv0_9.repository.RoleRepository;
import com.example.jflashcardsv0_9.repository.UserRepository;
import com.example.jflashcardsv0_9.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@SpringBootApplication
public class JFlashcardsV09Application implements CommandLineRunner{

    public static void main(String[] args) {
        SpringApplication.run(JFlashcardsV09Application.class, args);
    }
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Override
    public  void run(String... arg) throws Exception{
//        Role role = new Role();
//        role.setName("ROLE_LEARNER");
//        roleRepository.save(role);
//        Role role1 = new Role();
//        role1.setName("ROLE_TEACHER");
//        roleRepository.save(role1);
//        Role role2 = new Role();
//        role2.setName("ROLE_ADMIN");
//        roleRepository.save(role2);
//        RegisterDTO registerDTO = RegisterDTO.builder()
//                .userName("hieu")
//                .password("123456789")
//                .email("huuuu@gmail.com")
//                .firstName("hoang")
//                .lastName("hieu")
//                .build();
//        userService.registrationADMIN(registerDTO);
    }

}
