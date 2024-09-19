package com.example.randevu.controller;

import com.example.randevu.entity.User;
import com.example.randevu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = {"http://localhost:4200"})

public class DoctorController {

    @Autowired
    private UserService userService;

    @GetMapping("/{identityNumber}")
    public ResponseEntity<User> getUserByIdentityNumber(@PathVariable String identityNumber) {
        Optional<User> user = userService.findByIdentityNumber(identityNumber);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllDoctors() {
        List<User> doctors = userService.findAllDoctors();
        return ResponseEntity.ok(doctors);
    }
    @GetMapping("/specialty/{specialtyId}")
    public ResponseEntity<List<User>> getDoctorsBySpecialty(@PathVariable Long specialtyId) {
        List<User> doctors = userService.findDoctorsBySpecialty(specialtyId);
        return ResponseEntity.ok(doctors);
    }


}