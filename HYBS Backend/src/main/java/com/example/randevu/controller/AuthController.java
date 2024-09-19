package com.example.randevu.controller;

import com.example.randevu.dto.LoginRequest;
import com.example.randevu.entity.User;
import com.example.randevu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.saveUser(user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        System.out.println("Login Request: " + loginRequest); // Debug log
        boolean isAuthenticated = userService.validateUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (isAuthenticated) {
            User user = userService.findByEmail(loginRequest.getEmail()).orElse(null);
            if (user != null) {
                return ResponseEntity.ok(user);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/check-identity/{identityNumber}")
    public ResponseEntity<Map<String, Boolean>> checkIdentityNumberExists(@PathVariable String identityNumber) {
        boolean exists = userService.identityNumberExists(identityNumber);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }
}
