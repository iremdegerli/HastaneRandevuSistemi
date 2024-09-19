package com.example.randevu.service;

import com.example.randevu.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAllUsers();
    List<User> findAllDoctors();
    Optional<User> findByEmail(String email);
    Optional<User> findByIdentityNumber(String identityNumber);
    User saveUser(User user);
    Optional<User> findById(Long id);
    boolean validateUser(String email, String password);

    List<User> findDoctorsBySpecialty(Long specialtyId);
}