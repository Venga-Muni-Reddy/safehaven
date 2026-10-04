package com.socialconnect.helpinghands.controller;

import com.socialconnect.helpinghands.service.EmailService2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService2 emailService;

    @PostMapping("/send-thank-you")
    public String sendThankYouCard(
            @RequestParam String email,
            @RequestParam String name,
            @RequestParam String message) {
        emailService.sendThankYouEmail(email, name, message);
        return "Thank-you email sent successfully to " + email;
    }
}
