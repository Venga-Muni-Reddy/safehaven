package com.socialconnect.helpinghands.service;

import com.socialconnect.helpinghands.model.Badge;
import com.socialconnect.helpinghands.model.NGOTaskAssignment;
import com.socialconnect.helpinghands.repository.BadgeRepository;
import com.socialconnect.helpinghands.repository.NGOTaskAssignmentRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Comparator;

@Service
public class BadgeService {

    private final BadgeRepository badgeRepository;
    private final NGOTaskAssignmentRepository taskRepository;

    public BadgeService(BadgeRepository badgeRepository, NGOTaskAssignmentRepository taskRepository) {
        this.badgeRepository = badgeRepository;
        this.taskRepository = taskRepository;
    }

    // ✅ Admin manually assigns badges
    public Badge assignBadge(Long volunteerId, String badgeType) {
        Badge badge = new Badge(volunteerId, badgeType, 0);
        return badgeRepository.save(badge);
    }

    // ✅ Automatically assigns streak badge
    public void checkAndAssignStreakBadge(Long volunteerId) {
        List<NGOTaskAssignment> completedTasks = taskRepository.findByVolunteerIdAndStatus(volunteerId, "Completed");

        if (completedTasks.size() < 3) {
            return; // Not enough tasks for a streak
        }

        completedTasks.sort(Comparator.comparing(NGOTaskAssignment::getCompletedAt));

        int streakCount = 1;
        LocalDate lastCompletedDate = completedTasks.get(0).getCompletedAt().toLocalDate();

        for (int i = 1; i < completedTasks.size(); i++) {
            LocalDate currentCompletedDate = completedTasks.get(i).getCompletedAt().toLocalDate();

            if (currentCompletedDate.equals(lastCompletedDate.plusDays(1))) {
                streakCount++;
            } else {
                streakCount = 1;
            }

            lastCompletedDate = currentCompletedDate;

            if (streakCount == 3) {
                badgeRepository.save(new Badge(volunteerId, "Streak", streakCount));
                return;
            }
        }
    }

    public List<Badge> getBadgesByVolunteerId(Long volunteerId) {
        return badgeRepository.findByVolunteerId(volunteerId);
    }
    
    public List<Badge> getVolunteersWithBadge(String badgeType) {
        return badgeRepository.findByBadgeType(badgeType);
    }
    
    public List<Long> getVolunteersWithBadges() {
        return badgeRepository.findAll().stream()
                .map(Badge::getVolunteerId)
                .distinct()
                .toList();
    }

    public List<Badge> getAllBadges() {
        return badgeRepository.findAll();
    }


}

