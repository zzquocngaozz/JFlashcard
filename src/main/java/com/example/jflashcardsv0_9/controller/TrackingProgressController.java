package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.TrackingProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/tracking")
public class TrackingProgressController {
    @Autowired
    TrackingProgressService trackingProgressService;
    @PostMapping("/{setId}&&{cardId}")
    public ResponseEntity<?> trackingProgress(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long setId, @PathVariable long cardId){
        trackingProgressService.trackingProgress(myUserDetail.getUser(),setId,cardId);
        return ResponseEntity.ok("tracking thành công");
    }
}
