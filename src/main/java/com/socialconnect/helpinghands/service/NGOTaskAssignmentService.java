package com.socialconnect.helpinghands.service;

import com.socialconnect.helpinghands.model.NGOTaskAssignment;
import com.socialconnect.helpinghands.model.ReportCase;
import com.socialconnect.helpinghands.repository.NGOTaskAssignmentRepository;
import com.socialconnect.helpinghands.repository.ReportCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NGOTaskAssignmentService {

    @Autowired
    private NGOTaskAssignmentRepository ngoTaskAssignmentRepository;

    @Autowired
    private ReportCaseRepository reportCaseRepository;

    // Fetch all public reports
    public List<ReportCase> getAllReports() {
        return reportCaseRepository.findAll();
    }

    
    // Assign task to a volunteer
    public NGOTaskAssignment assignTaskToVolunteer(Long reportId, Long volunteerId, String volunteerName, String volunteerContact) {
        Optional<ReportCase> reportOptional = reportCaseRepository.findById(reportId);

        if (reportOptional.isPresent()) {
            NGOTaskAssignment task = new NGOTaskAssignment(
                    reportOptional.get(),
                    volunteerName,
                    volunteerContact,
                    "Pending",
                    LocalDateTime.now(),
                    volunteerId
            );
            return ngoTaskAssignmentRepository.save(task);
        } else {
            throw new RuntimeException("Report with ID " + reportId + " not found.");
        }
    }

    // Update task status
    public NGOTaskAssignment updateTaskStatus(Long taskId, String status) {
        Optional<NGOTaskAssignment> taskOptional = ngoTaskAssignmentRepository.findById(taskId);

        if (taskOptional.isPresent()) {
            NGOTaskAssignment task = taskOptional.get();
            task.setStatus(status);

            if ("Completed".equalsIgnoreCase(status)) {
                task.setCompletedAt(LocalDateTime.now());
            }

            return ngoTaskAssignmentRepository.save(task);
        } else {
            throw new RuntimeException("Task with ID " + taskId + " not found.");
        }
    }

    // Fetch tasks by status
    public List<NGOTaskAssignment> getTasksByStatus(String status) {
        return ngoTaskAssignmentRepository.findByStatus(status);
    }
    
    
}
