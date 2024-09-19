package com.example.randevu.repository;

import com.example.randevu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByIdentityNumber(String identityNumber);
    List<User>findByRole(String role);
    List<User> findBySpecialtyId(Long specialtyId);
    boolean existsByIdentityNumber(String identityNumber);
}
