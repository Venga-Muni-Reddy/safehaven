package com.socialconnect.helpinghands.service;


import com.socialconnect.helpinghands.model.Donation;
import com.socialconnect.helpinghands.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    // Save donation
    public Donation saveDonation(Donation donation) {
        return donationRepository.save(donation);
    }

    // Get all donations
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    // Get donation by ID
    public Optional<Donation> getDonationById(Long id) {
        return donationRepository.findById(id);
    }

    // Delete donation
    public void deleteDonation(Long id) {
        donationRepository.deleteById(id);
    }
}
