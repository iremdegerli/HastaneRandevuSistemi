package com.example.randevu.service;

import com.example.randevu.entity.WorkingHours;

import java.util.List;

public interface WorkingHoursService {
    WorkingHours saveWorkingHours(WorkingHours workingHours);
    WorkingHours updateWorkingHours(Long id, WorkingHours workingHours);
    WorkingHours getWorkingHoursById(Long id);
    List<WorkingHours> getWorkingHoursByDoctorId(Long doctorId);
    void deleteWorkingHours(Long id);
    List<WorkingHours> getDoctorWorkingHours(Long doctorId);
}
