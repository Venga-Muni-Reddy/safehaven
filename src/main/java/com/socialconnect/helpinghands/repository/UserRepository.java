package com.socialconnect.helpinghands.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.socialconnect.helpinghands.model.User;
import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);
	List<User> findByStatus(String status);
	boolean existsByEmail(String email);
	List<User> findByRole(String role);
	
}
