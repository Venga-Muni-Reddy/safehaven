package com.socialconnect.helpinghands.controller;
import com.socialconnect.helpinghands.model.Badge;
import com.socialconnect.helpinghands.service.BadgeService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/badges")
@CrossOrigin(origins = "*")
public class BadgeController {

    private final BadgeService badgeService;

    public BadgeController(BadgeService badgeService) {
        this.badgeService = badgeService;
    }

    @PostMapping("/assign")
    public Badge assignBadge(@RequestParam Long volunteerId, @RequestParam String badgeType) {
        return badgeService.assignBadge(volunteerId, badgeType);
    }

    @GetMapping("/{volunteerId}")
    public List<Badge> getBadges(@PathVariable Long volunteerId) {
        return badgeService.getBadgesByVolunteerId(volunteerId);
    }
    
    @GetMapping("/badge/{badgeType}")
    public List<Badge> getVolunteersWithBadge(@PathVariable String badgeType) {
        return badgeService.getVolunteersWithBadge(badgeType);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Badge>> getAllBadges() {
        List<Badge> badges = badgeService.getAllBadges();
        return ResponseEntity.ok(badges);
    }
    
}
