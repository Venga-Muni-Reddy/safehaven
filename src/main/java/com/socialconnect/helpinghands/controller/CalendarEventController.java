package com.socialconnect.helpinghands.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.socialconnect.helpinghands.repository.CalendarEventRepository;
import com.socialconnect.helpinghands.model.CalendarEvent;

import java.util.List;

@RestController
@RequestMapping("/calendar")
@CrossOrigin(origins = "*")
public class CalendarEventController {

    @Autowired
    private CalendarEventRepository calendarEventRepository;

    // Get all events for a specific volunteer
    @GetMapping("/{volunteerId}")
    public List<CalendarEvent> getEvents(@PathVariable Long volunteerId) {
        return calendarEventRepository.findByVolunteerId(volunteerId);
    }

    // Add a new calendar event
    @PostMapping
    public CalendarEvent addEvent(@RequestBody CalendarEvent event) {
        return calendarEventRepository.save(event);
    }

    // Update an existing calendar event
    @PutMapping("/{id}")
    public CalendarEvent updateEvent(@PathVariable Long id, @RequestBody CalendarEvent eventDetails) {
        CalendarEvent event = calendarEventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event with ID " + id + " not found"));

        event.setTitle(eventDetails.getTitle());
        event.setDescription(eventDetails.getDescription());
        event.setStart(eventDetails.getStart());
        event.setEnd(eventDetails.getEnd());

        return calendarEventRepository.save(event);
    }

    // Delete an event
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        CalendarEvent event = calendarEventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event with ID " + id + " not found"));

        calendarEventRepository.delete(event);
        return ResponseEntity.ok().build();
    }
}
