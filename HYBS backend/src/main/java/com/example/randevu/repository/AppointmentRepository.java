package com.example.randevu.repository;

import com.example.randevu.entity.Appointment;
import com.example.randevu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctor(User doctor);
    List<Appointment> findByPatientIdentityNumber(String patientIdentityNumber);
}