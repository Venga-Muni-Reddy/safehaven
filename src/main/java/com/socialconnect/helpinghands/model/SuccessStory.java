package com.socialconnect.helpinghands.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "success_stories")
public class SuccessStory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 5000)
    private String description;

    private String imageUrl; // This will store the image URL as a 
    
	public SuccessStory() {
		super();
	}
    
	public SuccessStory(Long id, String title, String description, String imageUrl) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.imageUrl = imageUrl;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}





	
    
    
    
}
