package com.example.randevu.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
public class Appointment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "doctor_id")
	private User doctor;

	@ManyToOne
	@JoinColumn(name = "specialty_id")
	private Specialty specialty;


	@Column(nullable = false)
	private String patientName;

	@Column(nullable = false)
	private String patientSurname;

	@Column(nullable = false)
	private String patientIdentityNumber;

	@Column(nullable = false)
	private LocalDateTime appointmentDate;

	@Column(nullable = false)
	private Boolean isActive = true;
}