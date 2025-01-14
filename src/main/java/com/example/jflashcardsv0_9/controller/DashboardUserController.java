package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/dashboard/listUser")
public class DashboardUserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDTO> getAllUser(@AuthenticationPrincipal MyUserDetail myUserDetail){
        return userService.findAllUser();
    }
    @GetMapping("/viewUser/{userId}")
    public UserDTO viewUser(@PathVariable int userId) {
        return userService.getUserByUserId(userId);
    }

    @PutMapping("/block/{userId}")
    public ResponseEntity<String> blockUser(@PathVariable Long userId) {
        userService.blockUser(userId);
        return ResponseEntity.ok("User blocked successfully");
    }
    @PutMapping("/unblock/{userId}")
    public ResponseEntity<String> unblockUser(@PathVariable Long userId) {
        userService.unblockUser(userId);
        return ResponseEntity.ok("User unblocked successfully");
    }
    @PutMapping("/changeRole/{userId}")
    public ResponseEntity<String> changeUserRole(@PathVariable Long userId, @RequestBody UserDTO userDTO) {
        userService.changeUserRole(userId, userDTO.getRole());
        return ResponseEntity.ok("User roles changed successfully");
    }
    @PostMapping("/addUser")
    public ResponseEntity<String>  addUser(@RequestBody UserDTO userDTO){
        userService.addUser(userDTO);
        return ResponseEntity.ok("add User successfully");
    }
}
