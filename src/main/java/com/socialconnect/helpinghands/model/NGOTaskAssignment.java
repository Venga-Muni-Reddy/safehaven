package com.socialconnect.helpinghands.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "ngo_task_assignments")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class NGOTaskAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "report_id", nullable = false)
    private ReportCase reportCase;

    @Column(nullable = false)
    private String volunteerName;

    @Column(nullable = false)
    private Long volunteerId;

    @Column(nullable = false)
    private String volunteerContact;

    @Column(nullable = false)
    private String status; // Pending, InProgress, Completed

    @Column(nullable = false)
    private LocalDateTime assignedAt;

    @Column
    private LocalDateTime completedAt;

    // Default constructor
    public NGOTaskAssignment() {
    }

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ReportCase getReportCase() {
		return reportCase;
	}

	public void setReportCase(ReportCase reportCase) {
		this.reportCase = reportCase;
	}

	public String getVolunteerName() {
		return volunteerName;
	}

	public void setVolunteerName(String volunteerName) {
		this.volunteerName = volunteerName;
	}

	public Long getVolunteerId() {
		return volunteerId;
	}

	public void setVolunteerId(Long volunteerId) {
		this.volunteerId = volunteerId;
	}

	public String getVolunteerContact() {
		return volunteerContact;
	}

	public void setVolunteerContact(String volunteerContact) {
		this.volunteerContact = volunteerContact;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getAssignedAt() {
		return assignedAt;
	}

	public void setAssignedAt(LocalDateTime assignedAt) {
		this.assignedAt = assignedAt;
	}

	public LocalDateTime getCompletedAt() {
		return completedAt;
	}

	public void setCompletedAt(LocalDateTime completedAt) {
		this.completedAt = completedAt;
	}

	// Constructor with fields
    public NGOTaskAssignment(ReportCase reportCase, String volunteerName, String volunteerContact, String status, LocalDateTime assignedAt, Long volunteerId) {
        this.reportCase = reportCase;
        this.volunteerName = volunteerName;
        this.volunteerContact = volunteerContact;
        this.status = status;
        this.assignedAt = assignedAt;
        this.volunteerId = volunteerId;
    }

    // Getters and Setters
    // ... No changes needed to getters/setters
}
