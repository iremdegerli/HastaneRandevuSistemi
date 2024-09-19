package com.example.randevu.controller;
import com.example.randevu.entity.Specialty;
import com.example.randevu.service.SpecialtyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/specialties")
@CrossOrigin(origins = {"http://localhost:4200"})

public class SpecialtyController {

    @Autowired
    private SpecialtyService specialtyService;

    @PostMapping
    public ResponseEntity<Specialty> createSpecialty(@RequestBody Specialty specialty) {
        return ResponseEntity.ok(specialtyService.createSpecialty(specialty));
    }

    @GetMapping
    public ResponseEntity<List<Specialty>> getAllSpecialties() {
        return ResponseEntity.ok(specialtyService.getAllSpecialties());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSpecialty(@PathVariable Long id) {
        specialtyService.deleteSpecialtyById(id);
        return ResponseEntity.ok(Collections.singletonMap("message", "Specialty başarıyla silindi"));
    }

    // Uzmanlık alanı güncelleme veya silme gibi işlemler eklenebilir
}
