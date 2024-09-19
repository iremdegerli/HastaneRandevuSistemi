package com.example.randevu.service.impl;

import com.example.randevu.entity.WorkingHours;
import com.example.randevu.repository.WorkingHoursRepository;
import com.example.randevu.service.WorkingHoursService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WorkingHoursServiceImpl implements WorkingHoursService {

    @Autowired
    private WorkingHoursRepository workingHoursRepository;

    @Override
    public WorkingHours saveWorkingHours(WorkingHours workingHours) {
        return workingHoursRepository.save(workingHours);
    }

    @Override
    public WorkingHours updateWorkingHours(Long id, WorkingHours workingHours) {
        if (workingHoursRepository.existsById(id)) {
            workingHours.setId(id);
            return workingHoursRepository.save(workingHours);
        }
        return null;
    }

    @Override
    public WorkingHours getWorkingHoursById(Long id) {
        return workingHoursRepository.findById(id).orElse(null);
    }

    @Override
    public List<WorkingHours> getWorkingHoursByDoctorId(Long doctorId) {
        return workingHoursRepository.findByDoctorId(doctorId);
    }

    @Override
    public void deleteWorkingHours(Long id) {
        if (workingHoursRepository.existsById(id)) {
            workingHoursRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Working hours not found");
        }
    }

    @Override
    public List<WorkingHours> getDoctorWorkingHours(Long doctorId) {
        return workingHoursRepository.findByDoctorIdAndDateAfter(doctorId, LocalDate.now());
    }


}
