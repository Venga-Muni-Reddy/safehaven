package com.socialconnect.helpinghands.repository;

import com.socialconnect.helpinghands.model.ReportCase;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReportCaseRepository extends JpaRepository<ReportCase, Long> {
    @Query("SELECT r FROM ReportCase r WHERE r.id NOT IN (SELECT a.reportCase.id FROM NGOTaskAssignment a)")
    List<ReportCase> findUnassignedReports();
    
}
