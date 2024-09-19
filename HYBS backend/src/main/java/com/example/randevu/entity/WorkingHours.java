package com.example.randevu.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "working_hours")
@Data
public class WorkingHours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;


    @ElementCollection
    @CollectionTable(name = "additional_hours", joinColumns = @JoinColumn(name = "working_hours_id"))
    @Column(name = "additional_hours")
    private List<AdditionalHours> additionalHours;

    @Data
    @Embeddable
    public static class AdditionalHours {
        @Column(name = "start_time")
        private LocalTime startTime;

        @Column(name = "end_time")
        private LocalTime endTime;
    }
}


