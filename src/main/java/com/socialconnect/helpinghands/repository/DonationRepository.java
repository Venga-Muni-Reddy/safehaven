package com.socialconnect.helpinghands.repository;

import com.socialconnect.helpinghands.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRepository extends JpaRepository<Donation, Long> {
}

