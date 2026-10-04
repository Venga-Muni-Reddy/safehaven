package com.socialconnect.helpinghands.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.socialconnect.helpinghands.model.CalendarEvent;

public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
    List<CalendarEvent> findByVolunteerId(Long volunteerId);
}

