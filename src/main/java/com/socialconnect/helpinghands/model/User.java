package com.socialconnect.helpinghands.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Table(name="users")
@Data
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private Long id;
	private String name;
	private String email;
	private String password;
	private String phone;
	private String address;
	private String role; //Public, Volunteer, NGO
	private String status;
	
	private String gov_id;       //Volunteer
	private String experience;   //Volunteer
	
	private String regNumber;     //NGO
	private String approvalCert;  //NGO
	
	//Encrypt password before saving 
	public void setPassword(String password) {
	    this.password = password; // No hashing here
	}

	//Getters && Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getGov_id() {
		return gov_id;
	}

	public void setGov_id(String gov_id) {
		this.gov_id = gov_id;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getRegNumber() {
		return regNumber;
	}

	public void setRegNumber(String regNumber) {
		this.regNumber = regNumber;
	}

	public String getApprovalCert() {
		return approvalCert;
	}

	public void setApprovalCert(String approvalCert) {
		this.approvalCert = approvalCert;
	}

	public String getPassword() {
		return password;
	}

	//toString() method
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", phone=" + phone
				+ ", address=" + address + ", role=" + role + ", status=" + status + ", gov_id=" + gov_id
				+ ", experience=" + experience + ", regNumber=" + regNumber + ", approvalCert=" + approvalCert + "]";
	}
	
	
	
	
}
