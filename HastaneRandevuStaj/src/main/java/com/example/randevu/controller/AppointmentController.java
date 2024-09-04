package com.example.randevu.controller;
import com.example.randevu.dto.AppointmentRequest;
import com.example.randevu.entity.Appointment;
import com.example.randevu.entity.Specialty;
import com.example.randevu.entity.User;
import com.example.randevu.service.AppointmentService;
import com.example.randevu.service.SpecialtyService;
import com.example.randevu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    @Autowired
    private SpecialtyService specialtyService;

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentRequest appointmentRequest ) {
        Optional<User> doctor = userService.findById(appointmentRequest.getDoctorId());
        Optional<Specialty> specialty = specialtyService.findById(appointmentRequest.getSpecialtyId());

        if (doctor.isPresent() && specialty.isPresent()) {
            Appointment appointment = new Appointment();
            appointment.setDoctor(doctor.get());
            appointment.setSpecialty(specialty.get());
            appointment.setPatientName(appointmentRequest.getPatientName());
            appointment.setPatientSurname(appointmentRequest.getPatientSurname());
            appointment.setPatientIdentityNumber(appointmentRequest.getPatientIdentityNumber());
            appointment.setAppointmentDate(appointmentRequest.getAppointmentDate());
            appointment.setIsActive(appointmentRequest.getIsActive());

            Appointment createdAppointment = appointmentService.createAppointment(appointment);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAppointment);
        } else {
            return ResponseEntity.badRequest().build();
        }    }

    @GetMapping("/doctors/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        Optional<User> doctor = userService.findById(doctorId);
        return doctor.map(user -> ResponseEntity.ok(appointmentService.getAppointmentsByDoctor(user)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/patient/{identityNumber}")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatientIdentityNumber(@PathVariable String identityNumber) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByPatientIdentityNumber(identityNumber));
    }
}