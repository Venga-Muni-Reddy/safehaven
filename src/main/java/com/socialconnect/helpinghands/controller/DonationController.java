package com.socialconnect.helpinghands.controller;


import com.socialconnect.helpinghands.model.Donation;
import com.socialconnect.helpinghands.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin("*") // Allow frontend access
public class DonationController {

    @Autowired
    private DonationService donationService;

    // Create a new donation
    @PostMapping
    public ResponseEntity<Donation> createDonation(@RequestBody Donation donation) {
        Donation savedDonation = donationService.saveDonation(donation);
        return ResponseEntity.ok(savedDonation);
    }

    // Get all donations
    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations() {
        return ResponseEntity.ok(donationService.getAllDonations());
    }

    // Get donation by ID
    @GetMapping("/{id}")
    public ResponseEntity<Donation> getDonationById(@PathVariable Long id) {
        Optional<Donation> donation = donationService.getDonationById(id);
        return donation.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a donation
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
        return ResponseEntity.ok("Donation deleted successfully");
    }
}
