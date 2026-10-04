package com.socialconnect.helpinghands.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService2 {

    @Autowired
    private JavaMailSender mailSender;

    public void sendThankYouEmail(String toEmail, String name, String message) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setFrom("usaribala@gmail.com"); // Sender's email address
        email.setTo(toEmail);
        email.setSubject("Thank You from Helping Hands");
        email.setText(buildThankYouMessage(name, message));
        mailSender.send(email);
    }

    private String buildThankYouMessage(String name, String message) {
        return "Dear " + name + ",\n\n"
                + "Thank you for your incredible support and contribution to our initiative. "
                + "Your efforts make a meaningful difference in the lives of those in need.\n\n"
                + message + "\n\n"
                + "With gratitude,\n"
                + "The Helping Hands Team";
    }
}
