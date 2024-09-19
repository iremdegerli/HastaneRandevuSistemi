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
@CrossOrigin(origins = {"http://localhost:4200"})
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    @Autowired
    private SpecialtyService specialtyService;

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        try {
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
                appointment.updateIsActive();

                // Veritabanı işlemi burada
                Appointment createdAppointment = appointmentService.createAppointment(appointment);
                return ResponseEntity.status(HttpStatus.CREATED).body(createdAppointment);
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        } catch (Exception e) {
            // Hataları loglayın
            System.err.println("Error while creating appointment: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments(){
        return ResponseEntity.ok(appointmentService.findAllAppointments());
    }

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

    @PostMapping("/patient/{identityNumber}")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatient(@PathVariable String identityNumber) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByPatientIdentityNumber(identityNumber));
    }


}