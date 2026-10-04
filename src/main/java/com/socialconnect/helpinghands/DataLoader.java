package com.socialconnect.helpinghands;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import com.socialconnect.helpinghands.model.User;
import com.socialconnect.helpinghands.repository.UserRepository;

/** Seeds demo accounts on startup, only when SEED_PASSWORD is set in the environment. */
@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Value("${seed.password:}")
    private String seedPassword;

    @Override
    public void run(String... args) {
        if (seedPassword == null || seedPassword.isBlank()) return;
        seed("SafeHaven Admin", "admin@safehaven.demo", "Admin", "Kadapa");
        seed("Hope Orphanage (NGO)", "ngo@safehaven.demo", "NGO", "Kadapa");
        seed("Demo Volunteer", "volunteer@safehaven.demo", "Volunteer", "Kadapa");
    }

    private void seed(String name, String email, String role, String address) {
        if (userRepository.findByEmail(email) != null) return;
        User u = new User();
        u.setName(name);
        u.setEmail(email);
        u.setPassword(BCrypt.hashpw(seedPassword, BCrypt.gensalt(10)));
        u.setAddress(address);
        u.setPhone("9000000000");
        u.setRole(role);
        u.setStatus("Approved");
        userRepository.save(u);
    }
}
