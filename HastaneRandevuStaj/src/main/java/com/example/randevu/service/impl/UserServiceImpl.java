package com.example.randevu.service.impl;

import com.example.randevu.entity.Specialty;
import com.example.randevu.entity.User;
import com.example.randevu.repository.SpecialtyRepository;
import com.example.randevu.repository.UserRepository;
import com.example.randevu.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final SpecialtyRepository specialtyRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, SpecialtyRepository specialtyRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.specialtyRepository = specialtyRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> findAllDoctors() {
        return userRepository.findByRole("doctor");
    }
    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByIdentityNumber(String identityNumber) {
        return userRepository.findByIdentityNumber(identityNumber);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User saveUser(User user) {
        if (user.getRole().equals("doctor")) {
            if (user.getSpecialty() == null) {
                throw new IllegalArgumentException("Specialty cannot be null for doctors");
            }

            // Specialty'yi kontrol et ve kaydet
            Optional<Specialty> specialty = specialtyRepository.findById(user.getSpecialty().getId());
            if (specialty.isPresent()) {
                user.setSpecialty(specialty.get());
            } else {
                // Specialty'yi kaydediyoruz
                specialtyRepository.save(user.getSpecialty());
            }
        } else {
            // Admin kaydı ise specialty alanı null olabilir
            user.setSpecialty(null); // Admin için specialty'yi null yapıyoruz
        }

        return userRepository.save(user);
    }

    @Override
    public boolean validateUser(String email, String password) {
        Optional<User> user = findByEmail(email);
        if (user.isPresent()) {
            return password.equals(user.get().getPassword());
        }
        return false;
    }
}
