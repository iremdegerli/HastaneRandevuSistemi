package com.example.randevu.service;

import com.example.randevu.entity.Appointment;
import com.example.randevu.entity.User;

import java.util.List;

public interface AppointmentService {
    List<Appointment> getAppointmentsByDoctor(User doctor);

    List<Appointment> findAllAppointments();

    List<Appointment> getAppointmentsByPatientIdentityNumber(String patientIdentityNumber);
    Appointment createAppointment(Appointment appointment);
}
