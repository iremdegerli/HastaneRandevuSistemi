package com.example.randevu.service.impl;

import com.example.randevu.entity.Appointment;
import com.example.randevu.entity.Specialty;
import com.example.randevu.entity.User;
import com.example.randevu.repository.AppointmentRepository;
import com.example.randevu.repository.SpecialtyRepository;
import com.example.randevu.repository.UserRepository;
import com.example.randevu.service.AppointmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final SpecialtyRepository specialtyRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, UserRepository userRepository, SpecialtyRepository specialtyRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.specialtyRepository = specialtyRepository;
    }

    @Override
    public List<Appointment> getAppointmentsByDoctor(User doctor) {
        return appointmentRepository.findByDoctor(doctor);
    }

    @Override
    public List<Appointment> findAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public List<Appointment> getAppointmentsByPatientIdentityNumber(String patientIdentityNumber) {
        return appointmentRepository.findByPatientIdentityNumber(patientIdentityNumber);
    }

    @Override
    public Appointment createAppointment(Appointment appointment) {
        User doctor = appointment.getDoctor();
        Specialty specialty = appointment.getSpecialty();

        // Kullanıcı ve uzman geçerli mi kontrol etme
        if (doctor == null || specialty == null) {
            throw new IllegalArgumentException("Doctor or Specialty cannot be null");
        }

        return appointmentRepository.save(appointment);
    }
}
