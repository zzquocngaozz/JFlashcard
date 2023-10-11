package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.LoginDTORequest;
import com.example.jflashcardsv0_9.dto.LoginDTOResponse;
import com.example.jflashcardsv0_9.dto.TokenDTO;
import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.ProfileService;
import com.example.jflashcardsv0_9.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
public class ProfileController {

    @Autowired
    UserService userService;

    @Autowired
    ProfileService profileService;

    @GetMapping("/profile")
    public UserDTO getProfile(@AuthenticationPrincipal MyUserDetail myUserDetail) {
        return userService.getUserByUserId(myUserDetail.getUser().getUserId().intValue());
    }

    @PutMapping("/profile")
    public UserDTO updateProfile(@RequestBody UserDTO userDTO, @AuthenticationPrincipal MyUserDetail myUserDetail) {
        return profileService.updateProfile(userDTO, myUserDetail);
    }

    @PostMapping("/profile/verify")
    public ResponseEntity<?> getVerifyToken(@AuthenticationPrincipal MyUserDetail myUserDetail){
        profileService.sendVerifyToken(myUserDetail.getUser().getEmail());
        return ResponseEntity.ok("ok");
    }

    @PutMapping("/profile/verify")
    public ResponseEntity<?> verifyUser(@RequestBody TokenDTO tokenDTO, @AuthenticationPrincipal MyUserDetail myUserDetail){
        System.out.println(tokenDTO.getToken()+" "+myUserDetail.getUser().getEmail());
        profileService.verifyUser(tokenDTO.getToken(),myUserDetail.getUser().getEmail());
        return ResponseEntity.ok("ok");
    }
}
