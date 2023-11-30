package com.example.jflashcardsv0_9.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class WebSecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;
    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }
    @Bean
    public BCryptPasswordEncoder passwordEncoDer() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().and().authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/api/v1/read/preview/**","/api/v1/search/**", "/api/v1/login", "/api/v1/register","/api/v1/forgot","/api/v1","/api/v1/verify").permitAll()
                                .requestMatchers("/api/v1/dashboard/**").hasRole("ADMIN")
                                .requestMatchers("/api/v1/managerset/**","/api/v1/dashboard").hasRole("MANAGER")
                                .requestMatchers("/api/v1/classroom/{classId}/set/listset","/api/v1/classroom/{classId}/set/add").hasRole("TEACHER")
//                                .requestMatchers("/api/v1/classroom/**").hasRole("TEACHER")
                                .anyRequest().authenticated()
                                .and()
                                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                )
                .csrf(csrf -> csrf.disable())
                .headers(headers -> {
                    headers.frameOptions().disable(); // Tắt X-Frame-Options
                });

        return http.build();
    }
}
