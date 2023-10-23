package com.example.jflashcardsv0_9.security;

import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.mapper.UserMapper;
import com.example.jflashcardsv0_9.dto.TokenPayload;
import com.example.jflashcardsv0_9.repository.UserRepository;
import com.example.jflashcardsv0_9.util.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String requestTokenHeader = request.getHeader("Authorization");

        String token = null;
        TokenPayload tokenPayLoad = null;
        System.out.println(requestTokenHeader);
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            token = requestTokenHeader.split(" ")[1];
            try {
                tokenPayLoad = jwtTokenUtil.getTokenPayload(token);
            } catch (IllegalArgumentException ex) {
                System.out.println("Unable to get JWT");
            } catch (ExpiredJwtException ex) {
                System.out.println("Token has expired");
            }
        } else {
            System.out.println("JWT Token does not start with 'Bearer '");
        }

        if (tokenPayLoad != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Optional<User> accountOptional = userRepository.findById((int) tokenPayLoad.getUserId());

            if (accountOptional.isPresent()) {
                User user = accountOptional.get();
                //check token hop le
                if (jwtTokenUtil.isValid(token, UserMapper.toTokenPayload(user))) {

                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUserName());

                    // Tạo đối tượng xác thực và đặt nó vào SecurityContextHolder
                    Authentication authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }else{}
            }
        }
        filterChain.doFilter(request, response);
    }
}
