package com.socialconnect.helpinghands.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "calendar_events")
public class CalendarEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long volunteerId;
    private String title;
    private String description;
    @Column(name = "start_time")
    private LocalDateTime start;
    @Column(name = "end_time")
    private LocalDateTime end;
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public LocalDateTime getStart() {
		return start;
	}
	public void setStart(LocalDateTime start) {
		this.start = start;
	}
	public LocalDateTime getEnd() {
		return end;
	}
	public void setEnd(LocalDateTime end) {
		this.end = end;
	}
	public CalendarEvent(Long id, Long volunteerId, String title, String description, LocalDateTime start,
			LocalDateTime end) {
		super();
		this.id = id;
		this.volunteerId = volunteerId;
		this.title = title;
		this.description = description;
		this.start = start;
		this.end = end;
	}
	public CalendarEvent() {
		super();
	}

    // Getters and Setters
    
    
}

