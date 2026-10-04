package com.socialconnect.helpinghands.service;

import com.socialconnect.helpinghands.model.SuccessStory;
import com.socialconnect.helpinghands.repository.SuccessStoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SuccessStoryService {

    @Autowired
    private SuccessStoryRepository successStoryRepository;

    public SuccessStory createStory(String title, String description, String imageUrl) {
        SuccessStory story = new SuccessStory();
        story.setTitle(title);
        story.setDescription(description);
        story.setImageUrl(imageUrl); // Storing image URL

        return successStoryRepository.save(story);
    }

    public List<SuccessStory> getAllStories() {
        return successStoryRepository.findAll();
    }

    public Optional<SuccessStory> getStoryById(Long id) {
        return successStoryRepository.findById(id);
    }
}
