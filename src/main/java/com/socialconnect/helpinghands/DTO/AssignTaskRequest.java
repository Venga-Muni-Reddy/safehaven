package com.socialconnect.helpinghands.DTO;



public class AssignTaskRequest {
    private Long reportId;
    private Long volunteerId;
    private String volunteerName;
    private String volunteerContact;

    // Getters and Setters
    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public Long getVolunteerId() {
        return volunteerId;
    }

    public void setVolunteerId(Long volunteerId) {
        this.volunteerId = volunteerId;
    }

    public String getVolunteerName() {
        return volunteerName;
    }

    public void setVolunteerName(String volunteerName) {
        this.volunteerName = volunteerName;
    }

    public String getVolunteerContact() {
        return volunteerContact;
    }

    public void setVolunteerContact(String volunteerContact) {
        this.volunteerContact = volunteerContact;
    }
}
