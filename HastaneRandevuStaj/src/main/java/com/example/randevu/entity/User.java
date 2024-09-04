package com.example.randevu.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String surname;

    @Column(unique = true, nullable = false)
    private String identityNumber;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    @ManyToOne
    @JoinColumn(name = "specialty_id")
    private Specialty specialty;


    @PrePersist
    @PreUpdate
    private void validateSpecialty() {
        if ("doctor".equals(this.role) && this.specialty == null) {
            throw new RuntimeException("Specialty is required for doctors");
        }
    }
}