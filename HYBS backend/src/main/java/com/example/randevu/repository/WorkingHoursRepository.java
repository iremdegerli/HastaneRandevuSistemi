package com.example.randevu.repository;

import com.example.randevu.entity.WorkingHours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkingHoursRepository extends JpaRepository<WorkingHours, Long> {
    List<WorkingHours> findByDoctorId(Long doctorId);
    List<WorkingHours> findByDoctorIdAndDateAfter(Long doctorId, LocalDate date);
}
