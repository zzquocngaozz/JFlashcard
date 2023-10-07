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
    private RoleRepository roleRepository;

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
//        RegisterDTO registerDTO = RegisterDTO.builder()
//                .userName("hieu")
//                .password("Qwer1234")
//                .email("huuuu@gmail.com")
//                .firstName("hoang")
//                .lastName("hieu")
//                .build();
//        userService.registrationADMIN(registerDTO);
    }

}
