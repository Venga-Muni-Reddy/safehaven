package com.socialconnect.helpinghands.controller;

import com.socialconnect.helpinghands.model.ReportCase;
import com.socialconnect.helpinghands.repository.ReportCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.HashMap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportCaseController {

    @Autowired
    private ReportCaseRepository reportRepository;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<String> reportCase(
            @RequestParam("description") String description,
            @RequestParam("caseType") String caseType,
            @RequestParam("state") String state,
            @RequestParam("district") String district,
            @RequestParam("cityTownVillage") String cityTownVillage,
            @RequestParam("mandal") String mandal,
            @RequestParam("locality") String locality,
            @RequestParam("pincode") String pincode,
            @RequestParam("userId") Long userId,
            @RequestParam("cameraImage") MultipartFile cameraImage
    ) {
        try {
            byte[] imageData = cameraImage.getBytes(); // Convert image to byte array
 
            System.out.println("User Id : "+userId);
            // Create and save report
            ReportCase report = new ReportCase(description, caseType, state, district, cityTownVillage,
                    mandal, locality, pincode, imageData,userId);
            reportRepository.save(report);

            return ResponseEntity.ok("Report submitted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }
    
    
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllReports() {
        List<ReportCase> reports = reportRepository.findAll();
        List<Map<String, Object>> reportList = reports.stream().map(report -> {
            Map<String, Object> map = new HashMap<>();
            map.put("description", report.getDescription());
            map.put("caseType", report.getCaseType());
            map.put("state", report.getState());
            map.put("district", report.getDistrict());
            map.put("cityTownVillage", report.getCityTownVillage());
            map.put("mandal", report.getMandal());
            map.put("locality", report.getLocality());
            map.put("pincode", report.getPincode());
            map.put("landmark", report.getLandmark());
            map.put("cameraImage", report.getCameraImageBase64()); // Send Base64 directly
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(reportList);
    }

    @GetMapping("/unassigned")
    public ResponseEntity<List<Map<String, Object>>> getAllUnassignedReports() {
        List<ReportCase> reports = reportRepository.findUnassignedReports(); // Use custom method
        List<Map<String, Object>> reportList = reports.stream().map(report -> {
            Map<String, Object> map = new HashMap<>();
           
            map.put("description", report.getDescription());
            map.put("caseType", report.getCaseType());
            map.put("state", report.getState());
            map.put("district", report.getDistrict());
            map.put("cityTownVillage", report.getCityTownVillage());
            map.put("mandal", report.getMandal());
            map.put("locality", report.getLocality());
            map.put("pincode", report.getPincode());
            map.put("landmark", report.getLandmark());
            map.put("cameraImage", report.getCameraImageBase64());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(reportList);
    }
    @GetMapping("/public")
    public ResponseEntity<List<Map<String, Object>>> getPublicReports(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<ReportCase> pagedReports = reportRepository.findAll(pageable);

        List<Map<String, Object>> reportList = pagedReports.stream().map(report -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", report.getUserId());
            map.put("description", report.getDescription());
            map.put("caseType", report.getCaseType());
            map.put("state", report.getState());
            map.put("district", report.getDistrict());
            map.put("cityTownVillage", report.getCityTownVillage());
            map.put("mandal", report.getMandal());
            map.put("locality", report.getLocality());
            map.put("pincode", report.getPincode());
            map.put("landmark", report.getLandmark());
            map.put("cameraImage", report.getCameraImageBase64());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(reportList);
    }


    
}
