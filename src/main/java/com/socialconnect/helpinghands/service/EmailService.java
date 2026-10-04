package com.socialconnect.helpinghands.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;



@Service
public class EmailService {
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Transactional
	public void sendMessage(String to,String subject,String body) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("vengamunireddy040404@gmail.com");
	    message.setReplyTo("vengamunireddy040404@gmail.com");  // Add this line

		message.setTo(to);
		
		message.setSubject(subject);
		message.setText(body);
		mailSender.send(message);
		//System.out.println("Email has been sent");
		
	}

}
