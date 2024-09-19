package com.example.randevu.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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

	@Column
	private String patientName;

	@Column
	private String patientSurname;

	@Column
	private String patientIdentityNumber;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	@Column
	private LocalDateTime appointmentDate;

	@Column
	private Boolean isActive = true;

	public void updateIsActive() {
		if (this.appointmentDate.isAfter(LocalDateTime.now())) {
			this.isActive = true;
		} else {
			this.isActive = false;
		}
	}
}


