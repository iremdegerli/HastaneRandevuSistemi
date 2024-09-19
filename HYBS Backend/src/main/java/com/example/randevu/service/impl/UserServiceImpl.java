package com.example.randevu.service.impl;

import com.example.randevu.entity.Specialty;
import com.example.randevu.entity.User;
import com.example.randevu.entity.WorkingHours;
import com.example.randevu.repository.SpecialtyRepository;
import com.example.randevu.repository.UserRepository;
import com.example.randevu.repository.WorkingHoursRepository;
import com.example.randevu.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final SpecialtyRepository specialtyRepository;
    private final PasswordEncoder passwordEncoder;
    private final WorkingHoursRepository workingHoursRepository;

    public UserServiceImpl(UserRepository userRepository, SpecialtyRepository specialtyRepository, PasswordEncoder passwordEncoder, WorkingHoursRepository workingHoursRepository) {
        this.userRepository = userRepository;
        this.specialtyRepository = specialtyRepository;
        this.passwordEncoder = passwordEncoder;
        this.workingHoursRepository=workingHoursRepository;
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
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
        // Doktor için specialty'yi kontrol et
        if (user.getRole().equals("doctor")) {
            if (user.getSpecialty() == null) {
                throw new IllegalArgumentException("Specialty cannot be null for doctors");
            }

            // Specialty'yi veritabanında kontrol et veya ekle
            Optional<Specialty> specialty = specialtyRepository.findById(user.getSpecialty().getId());
            if (specialty.isPresent()) {
                user.setSpecialty(specialty.get());
            } else {
                specialtyRepository.save(user.getSpecialty());
            }

            user.setWorkingHours(null);

        } else {
            user.setSpecialty(null); // Admin için specialty'yi null yapıyoruz
            user.setWorkingHours(null); // Admin için workingHours'u null yapıyoruz
        }

        // Şifreyi hash'leyerek saklıyoruz
        return userRepository.save(user);
    }

    @Override
    public boolean validateUser(String email, String password) {
        Optional<User> user = findByEmail(email);
        if (user.isPresent()) {
            // Şifreyi düz metin olarak karşılaştırıyoruz
            boolean isPasswordValid = password.equals(user.get().getPassword());
            System.out.println("Is Password Valid: " + isPasswordValid); // Debug log
            return isPasswordValid;
        }
        return false;
    }


    @Override
    public List<User> findDoctorsBySpecialty(Long specialtyId)
    {
        return userRepository.findBySpecialtyId(specialtyId);
    }
    @Override
    public boolean identityNumberExists(String identityNumber) {
        return userRepository.existsByIdentityNumber(identityNumber);
    }
}
