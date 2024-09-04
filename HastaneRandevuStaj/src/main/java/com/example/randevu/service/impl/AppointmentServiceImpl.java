package com.example.randevu.service.impl;

import com.example.randevu.entity.Appointment;
import com.example.randevu.entity.User;
import com.example.randevu.repository.AppointmentRepository;
import com.example.randevu.service.AppointmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public List<Appointment> getAppointmentsByDoctor(User doctor) {
        return appointmentRepository.findByDoctor(doctor);
    }

    @Override
    public List<Appointment> getAppointmentsByPatientIdentityNumber(String patientIdentityNumber) {
        return appointmentRepository.findByPatientIdentityNumber(patientIdentityNumber);
    }

    @Override
    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }
}
