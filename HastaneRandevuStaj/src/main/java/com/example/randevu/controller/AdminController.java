package com.example.randevu.controller;
import com.example.randevu.entity.Appointment;
import com.example.randevu.entity.Specialty;
import com.example.randevu.entity.User;
import com.example.randevu.service.AppointmentService;
import com.example.randevu.service.SpecialtyService;
import com.example.randevu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:4200"})

public class AdminController {

    @Autowired
    private SpecialtyService specialtyService;
    @Autowired
    private UserService userService;
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/specialties")
    public ResponseEntity<Specialty> createSpecialty(@RequestBody Specialty specialty) {
        return ResponseEntity.ok(specialtyService.createSpecialty(specialty));
    }

    @GetMapping("/specialties")
    public ResponseEntity<List<Specialty>> getAllSpecialties() {
        return ResponseEntity.ok(specialtyService.getAllSpecialties());
    }
    @GetMapping("/doctors")
    public ResponseEntity<List<User>> getAllDoctors() {
        List<User> doctors = userService.findAllDoctors();
        return ResponseEntity.ok(doctors);
    }
    @GetMapping("/doctors/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        Optional<User> doctor = userService.findById(doctorId);
        return doctor.map(user -> ResponseEntity.ok(appointmentService.getAppointmentsByDoctor(user)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}