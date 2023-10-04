package com.example.jflashcards.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import javax.sql.DataSource;


/**
 * @author Admin
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    private DataSource dataSource;

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailServiceImpl();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/api/v1","/api/v1/login", "/api/v1/register").permitAll() // Cho phép tất cả mọi người truy cập "/api/v1/login" và "/api/v1/register" mà không cần đăng nhập
                .antMatchers("/api/v1/homepage/**").authenticated() // Cấu hình đường dẫn API chỉ có người dùng đã xác thực mới được truy cập
                .antMatchers("/api/v1/dashboard/**").hasRole("ADMIN") // Cấu hình đường dẫn API chỉ có người dùng đã xác thực và có vai trò "ADMIN" mới được truy cập
                .anyRequest().authenticated() // Cấu hình các đường dẫn khác yêu cầu người dùng phải đăng nhập
                .and()
                .formLogin()
                .loginPage("/api/v1/login") // Đường dẫn đến trang login
                .permitAll()
                .and()
                .logout()
                .permitAll();

    }
}
