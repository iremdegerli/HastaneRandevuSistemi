package com.example.randevu.service.impl;

import com.example.randevu.entity.Specialty;
import com.example.randevu.repository.SpecialtyRepository;
import com.example.randevu.service.SpecialtyService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class SpecialtyServiceImpl implements SpecialtyService {

    private final SpecialtyRepository specialtyRepository;

    public SpecialtyServiceImpl(SpecialtyRepository specialtyRepository) {
        this.specialtyRepository = specialtyRepository;
    }

    @Override
    public List<Specialty> getAllSpecialties() {
        return specialtyRepository.findAll();
    }

    @Override
    public Specialty createSpecialty(Specialty specialty) {
        return specialtyRepository.save(specialty);
    }

    @Override
    public Optional<Specialty> findById(Long id) {
        return specialtyRepository.findById(id);
    }

    @Override
    public void deleteSpecialtyById(Long id) {
        if (specialtyRepository.existsById(id)) {
            specialtyRepository.deleteById(id); // ID ile specialty silinir
        } else {
            throw new RuntimeException("Specialty not found with id: " + id);
        }
    }
}
