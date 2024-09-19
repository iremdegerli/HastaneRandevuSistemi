package com.example.randevu.controller;

import com.example.randevu.entity.User;
import com.example.randevu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:4200"})

public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/identity/{identityNumber}")
    public ResponseEntity<User> getUserByIdentityNumber(@PathVariable String identityNumber) {
        Optional<User> user = userService.findByIdentityNumber(identityNumber);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/doctors")
    public ResponseEntity<List<User>> getDoctorsBySpecialty(@RequestParam Long specialtyId) {
        List<User> doctors = userService.findDoctorsBySpecialty(specialtyId);
        return ResponseEntity.ok(doctors);
    }
}
