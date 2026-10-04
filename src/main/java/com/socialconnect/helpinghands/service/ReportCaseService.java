package com.socialconnect.helpinghands.service;

import com.socialconnect.helpinghands.model.ReportCase;
import com.socialconnect.helpinghands.repository.ReportCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportCaseService {

    @Autowired
    private ReportCaseRepository repository;

    public ReportCase saveReport(ReportCase report) {
        return repository.save(report);
    }

    public List<ReportCase> getAllReports() {
        return repository.findAll();
    }
    
    
    
}
