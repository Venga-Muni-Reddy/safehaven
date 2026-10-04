package com.socialconnect.helpinghands.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import com.socialconnect.helpinghands.repository.UserRepository;
import com.socialconnect.helpinghands.model.User;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            response.put("message", "Email is already in use.");
            return response;
        }

        // Hash password before saving
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(10)));

        // Set approval status based on role
        if (user.getRole().equalsIgnoreCase("Public")) {
            user.setStatus("Approved");
        } else if (user.getRole().equalsIgnoreCase("Volunteer") || user.getRole().equalsIgnoreCase("NGO")) {
            user.setStatus("Pending");
        } else {
            response.put("message", "Invalid role specified.");
            return response;
        }

        userRepository.save(user);
        response.put("message", "Signup successful! Please wait for approval.");
        return response;
    }


    // Modify your login method
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User loginUser) {
        Map<String, Object> response = new HashMap<>();
        User user = userRepository.findByEmail(loginUser.getEmail());

        if (user == null || !BCrypt.checkpw(loginUser.getPassword(), user.getPassword())) {
            response.put("message", "Invalid credentials.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // 401 status
        }

        if (!user.getStatus().equals("Approved")) {
            response.put("message", "Your account is not approved.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response); // 403 status
        }

        // Login successful
        response.put("message", "Login successful!");
        response.put("userId", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        response.put("status", user.getStatus());

        return ResponseEntity.ok(response); // 200 OK
    }
    
    @GetMapping("/volunteers")
    public List<User> getAllVolunteers() {
        return userRepository.findByRole("Volunteer"); // Fetching users with role "Volunteer"
    }
    
    @GetMapping("/ngos")
    public List<User> getAllNgos() {
        return userRepository.findByRole("NGO");
    }

    

}
