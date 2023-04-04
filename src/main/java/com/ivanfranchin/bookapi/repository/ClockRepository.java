package com.ivanfranchin.bookapi.repository;

import com.ivanfranchin.bookapi.model.Clock;
import com.ivanfranchin.bookapi.model.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClockRepository extends JpaRepository<Clock, String> {

    @Query("SELECT e FROM Clock e ORDER BY e.date ASC")
    List<Clock> findAllByDateAsc();

    Optional<Clock> findByUserIdAndClockOutIsNull(long userId);

    List<Clock> findByDate(LocalDate date);

    @Query("SELECT HOUR(c.clockIn) AS hourOfDay, COUNT(c) AS totalClockIns "
            + "FROM Clock c "
            + "GROUP BY HOUR(c.clockIn)")
    List<Object[]> getTotalClockInsByHour();
}
