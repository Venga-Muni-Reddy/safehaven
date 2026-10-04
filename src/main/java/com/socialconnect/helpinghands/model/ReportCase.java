package com.socialconnect.helpinghands.model;

import java.util.Base64;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "reports")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ReportCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String caseType;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String district;

    @Column(nullable = false)
    private String cityTownVillage;

    @Column(nullable = false)
    private String mandal;

    @Column(nullable = false)
    private String locality;

    @Column(nullable = false)
    private String pincode;

    private String landmark;

    @Column(name="camera_image", columnDefinition = "bytea")
    private byte[] cameraImage;
    
    // New field to store the user who reported the case
    @Column(nullable = false)
    private Long userId; 

    // Default constructor
    public ReportCase() {
    }

    // Constructor with fields (updated to include userId)
    public ReportCase(String description, String caseType, String state, String district, String cityTownVillage,
                     String mandal, String locality, String pincode, byte[] cameraImage,Long userId) {
        this.description = description;
        this.caseType = caseType;
        this.state = state;
        this.district = district;
        this.cityTownVillage = cityTownVillage;
        this.mandal = mandal;
        this.locality = locality;
        this.pincode = pincode;
        this.cameraImage = cameraImage;
       this.userId=userId;
    }

    // Getters and Setters (updated)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCaseType() {
        return caseType;
    }

    public void setCaseType(String caseType) {
        this.caseType = caseType;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCityTownVillage() {
        return cityTownVillage;
    }

    public void setCityTownVillage(String cityTownVillage) {
        this.cityTownVillage = cityTownVillage;
    }

    public String getMandal() {
        return mandal;
    }

    public void setMandal(String mandal) {
        this.mandal = mandal;
    }

    public String getLocality() {
        return locality;
    }

    public void setLocality(String locality) {
        this.locality = locality;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getLandmark() {
        return landmark;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public byte[] getCameraImage() {
        return cameraImage;
    }

    public void setCameraImage(byte[] cameraImage) {
        this.cameraImage = cameraImage;
    }
    
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCameraImageBase64() {
        if (cameraImage != null) {
            return Base64.getEncoder().encodeToString(this.cameraImage);
        }
        return null;
    }
}