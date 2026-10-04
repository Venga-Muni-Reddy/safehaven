package com.socialconnect.helpinghands.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String donorName;
    private String email;
    private double amount;
    private String paymentMethod;
    private LocalDateTime donationDate = LocalDateTime.now();

    // Constructors
    public Donation() {}

    public Donation(String donorName, String email, double amount, String paymentMethod) {
        this.donorName = donorName;
        this.email = email;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDonorName() { return donorName; }
    public void setDonorName(String donorName) { this.donorName = donorName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public LocalDateTime getDonationDate() { return donationDate; }
    public void setDonationDate(LocalDateTime donationDate) { this.donationDate = donationDate; }
}
