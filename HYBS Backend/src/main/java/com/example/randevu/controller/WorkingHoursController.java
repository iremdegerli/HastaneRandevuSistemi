package com.example.randevu.controller;

import com.example.randevu.entity.WorkingHours;
import com.example.randevu.service.WorkingHoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/working-hours")
@CrossOrigin(origins = {"http://localhost:4200"})
public class WorkingHoursController {

    @Autowired
    private WorkingHoursService workingHoursService;

    @PostMapping
    public ResponseEntity<WorkingHours> createWorkingHours(@RequestBody WorkingHours workingHours) {
        WorkingHours savedWorkingHours = workingHoursService.saveWorkingHours(workingHours);
        return ResponseEntity.ok(savedWorkingHours);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkingHours> updateWorkingHours(@PathVariable Long id, @RequestBody WorkingHours workingHours) {
        WorkingHours updatedWorkingHours = workingHoursService.updateWorkingHours(id, workingHours);
        if (updatedWorkingHours != null) {
            return ResponseEntity.ok(updatedWorkingHours);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkingHours> getWorkingHoursById(@PathVariable Long id) {
        WorkingHours workingHours = workingHoursService.getWorkingHoursById(id);
        if (workingHours != null) {
            return ResponseEntity.ok(workingHours);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/doctor/{doctorId}")
    public List<WorkingHours> getWorkingHoursByDoctor(@PathVariable Long doctorId) {
        return workingHoursService.getWorkingHoursByDoctorId(doctorId);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkingHours(@PathVariable Long id) {
        workingHoursService.deleteWorkingHours(id);
        return ResponseEntity.noContent().build();
    }


}
