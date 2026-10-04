package com.socialconnect.helpinghands.repository;

import com.socialconnect.helpinghands.model.NGOTaskAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NGOTaskAssignmentRepository extends JpaRepository<NGOTaskAssignment, Long> {
    List<NGOTaskAssignment> findByVolunteerId(Long volunteerId);

    List<NGOTaskAssignment> findByStatus(String status);
    
    List<NGOTaskAssignment> findByVolunteerIdAndStatus(Long volunteerId, String status);
}
