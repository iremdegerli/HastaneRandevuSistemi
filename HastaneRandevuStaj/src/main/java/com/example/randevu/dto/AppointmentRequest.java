package com.example.randevu.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentRequest {
    private Long doctorId;
    private Long specialtyId;
    private String patientName;
    private String patientSurname;
    private String patientIdentityNumber;
    private LocalDateTime appointmentDate;
}
