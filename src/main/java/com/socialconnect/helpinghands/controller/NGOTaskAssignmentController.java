package com.socialconnect.helpinghands.controller;

import com.socialconnect.helpinghands.model.NGOTaskAssignment;
import com.socialconnect.helpinghands.model.ReportCase;
import com.socialconnect.helpinghands.service.NGOTaskAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.socialconnect.helpinghands.DTO.AssignTaskRequest;
import com.socialconnect.helpinghands.repository.BadgeRepository;

import java.util.List;

import com.socialconnect.helpinghands.model.Badge;
@RestController
@RequestMapping("/api/ngo-tasks")
@CrossOrigin(origins = "*")
public class NGOTaskAssignmentController {

    @Autowired
    private NGOTaskAssignmentService ngoTaskAssignmentService;
    
    @Autowired
    private BadgeRepository badgeRepository;

    // Get all reports
    @GetMapping("/reports")
    public List<ReportCase> getAllReports() {
        return ngoTaskAssignmentService.getAllReports();
    }

    // Assign task to a volunteer
    @PostMapping("/assign-task")
    public NGOTaskAssignment assignTaskToVolunteer(@RequestBody AssignTaskRequest assignTaskRequest) {
        return ngoTaskAssignmentService.assignTaskToVolunteer(
            assignTaskRequest.getReportId(),
            assignTaskRequest.getVolunteerId(),
            assignTaskRequest.getVolunteerName(),
            assignTaskRequest.getVolunteerContact()
        );
    }


    // Update task status
    @PutMapping("/update-status")
    public NGOTaskAssignment updateTaskStatus(
            @RequestParam Long taskId,
            @RequestParam String status) {
        return ngoTaskAssignmentService.updateTaskStatus(taskId, status);
    }

    // Fetch tasks by status
    @GetMapping("/tasks")
    public List<NGOTaskAssignment> getTasksByStatus(@RequestParam String status) {
        return ngoTaskAssignmentService.getTasksByStatus(status);
    }
    
    
    @GetMapping("/volunteers/badges")
    public List<Badge> getVolunteersWithBadges() {
        return badgeRepository.findAll();  // Fetches all volunteers with their badges
    }
    
    
    

}
