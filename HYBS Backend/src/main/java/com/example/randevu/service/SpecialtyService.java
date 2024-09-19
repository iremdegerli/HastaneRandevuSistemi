package com.example.randevu.service;
import com.example.randevu.entity.Specialty;
import com.example.randevu.repository.SpecialtyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface SpecialtyService {

    List<Specialty> getAllSpecialties();
    Specialty createSpecialty(Specialty specialty) ;
    void deleteSpecialtyById(Long id);
    Optional<Specialty> findById(Long id);
}
