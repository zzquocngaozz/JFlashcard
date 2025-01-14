package com.example.jflashcardsv0_9.security;

import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(username);
        if(user == null) {
            throw new UsernameNotFoundException("Could not find user");
        }
        return new MyUserDetail(user);
    }
}
