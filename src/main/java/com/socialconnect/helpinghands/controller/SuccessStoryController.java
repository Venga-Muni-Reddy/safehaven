package com.socialconnect.helpinghands.controller;

import com.socialconnect.helpinghands.model.SuccessStory;
import com.socialconnect.helpinghands.service.SuccessStoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/success-stories")
@CrossOrigin(origins = "*")
public class SuccessStoryController {

    @Autowired
    private SuccessStoryService successStoryService;

    @PostMapping("/add")
    public ResponseEntity<SuccessStory> createSuccessStory(@RequestBody SuccessStory successStory) {
        SuccessStory story = successStoryService.createStory(
            successStory.getTitle(), 
            successStory.getDescription(), 
            successStory.getImageUrl()
        );
        return ResponseEntity.ok(story);
    }

    @GetMapping
    public ResponseEntity<List<SuccessStory>> getAllStories() {
        return ResponseEntity.ok(successStoryService.getAllStories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuccessStory> getStoryById(@PathVariable Long id) {
        Optional<SuccessStory> story = successStoryService.getStoryById(id);
        return story.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
