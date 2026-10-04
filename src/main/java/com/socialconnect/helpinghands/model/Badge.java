package com.socialconnect.helpinghands.model;

import jakarta.persistence.*;

@Entity
@Table(name = "badges")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long volunteerId;

    @Column(nullable = false)
    private String badgeType; // Bronze, Silver, Gold, Streak

    @Column(nullable = false)
    private int streakCount;

    public Badge() {}

    public Badge(Long volunteerId, String badgeType, int streakCount) {
        this.volunteerId = volunteerId;
        this.badgeType = badgeType;
        this.streakCount = streakCount;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getVolunteerId() {
		return volunteerId;
	}

	public void setVolunteerId(Long volunteerId) {
		this.volunteerId = volunteerId;
	}

	public String getBadgeType() {
		return badgeType;
	}

	public void setBadgeType(String badgeType) {
		this.badgeType = badgeType;
	}

	public int getStreakCount() {
		return streakCount;
	}

	public void setStreakCount(int streakCount) {
		this.streakCount = streakCount;
	}



    // Getters and Setters
    
}
