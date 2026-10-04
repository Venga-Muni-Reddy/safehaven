package com.socialconnect.helpinghands.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.socialconnect.helpinghands.repository.UserRepository;
import com.socialconnect.helpinghands.service.EmailService;
import com.socialconnect.helpinghands.model.User;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private EmailService emailService;
	
	@PutMapping("/approve/{id}")
	public String approveUser(@PathVariable Long id) {
		Optional<User> optionalUser = repository.findById(id);
		if(optionalUser.isPresent()) {
			User user = optionalUser.get();
			user.setStatus("Approved");
			repository.save(user);
			emailService.sendMessage(user.getEmail(),"Approval Notification","Congratulation your account has been approved");
			//System.out.println("Email Has been sent");
			return "user approved and email sent successfully to "+user.getEmail();
			
		}
		return "User Not found";
	}
	
	@PutMapping("/reject/{id}")
	public String rejectUser(@PathVariable Long id) {
		Optional<User> optionalUser = repository.findById(id);
		if(optionalUser.isPresent()) {
			User user = optionalUser.get();
			user.setStatus("Rejected");
			repository.save(user);
			emailService.sendMessage(user.getEmail(),"Rejection Notification","Unfortunately your application has been rejected");
			return "user rejected  and email sent successfully";
			
		}

		return "User Not found";
	}
	
    @GetMapping("/pending-users")
    public List<User> getPendingUsers() {
        return repository.findByStatus("Pending");
    }

}
