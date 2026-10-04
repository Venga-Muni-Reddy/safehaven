package com.socialconnect.helpinghands.repository;

import com.socialconnect.helpinghands.model.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
    List<Badge> findByVolunteerId(Long volunteerId);
    List<Badge> findByBadgeType(String badgeType);
   

}
