package com.example.jflashcardsv0_9.controller;

import com.example.jflashcardsv0_9.dto.*;
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
    @GetMapping("/{classId}/class/set/{classSetId}")
    public TrackingClassSetSTO trackingProgressClassSet(@AuthenticationPrincipal MyUserDetail myUserDetail, @PathVariable long classId, @PathVariable long classSetId){
        return trackingProgressService.trackingProgressClassSet(myUserDetail.getUser(),classId,classSetId);
    }

    @PostMapping("/sendmail")
    public ResponseEntity<?> sendMailTracking(@RequestBody TrackingDTOResponse trackingDTOResponse){
        trackingProgressService.sendMailTracking(trackingDTOResponse);
        return ResponseEntity.ok("đã send mail");
    }
    @GetMapping("/homepage")
    public WeekTrackingDTOResponse weekTrackingHome(@AuthenticationPrincipal MyUserDetail myUserDetail,@RequestBody WeekTrackingDTO weekTrackingDTO){
        return trackingProgressService.weekTrackingHome(myUserDetail.getUser(),weekTrackingDTO);
    }
    @GetMapping("/{classId}/class/set/{classSetId}/view")
    public WeekTrackingDTOResponse weekTrackingClassSet(@RequestBody WeekTrackingDTO weekTrackingDTO){
        return trackingProgressService.weekTrackingClassSet(weekTrackingDTO);
    }

}
