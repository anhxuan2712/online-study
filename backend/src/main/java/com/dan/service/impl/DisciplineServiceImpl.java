package com.dan.service.impl;

import com.dan.model.Discipline;
import com.dan.repository.DisciplineRepository;
import com.dan.service.DisciplineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisciplineServiceImpl implements DisciplineService {
    @Autowired
    private DisciplineRepository disciplineRepository;

    @Override
    public List<Discipline> getAllDisciplines() {
        return disciplineRepository.findAll();
    }

    @Override
    public Discipline getDisciplineById(Long id) {
        return disciplineRepository.findById(id).orElseThrow(() -> new RuntimeException("Discipline not found with id " + id));
    }

    @Override
    public Discipline createDiscipline(Discipline discipline) {
        return disciplineRepository.save(discipline);
    }

    @Override
    public Discipline updateDiscipline(Discipline discipline, Long id) {
        return disciplineRepository.findById(id).map(discipline1 -> {
            discipline1.setName(discipline.getName());
            return disciplineRepository.save(discipline1);
        }).orElseThrow(() -> new RuntimeException("Discipline not found with id " + id));
    }

    @Override
    public void deleteDiscipline(Long id) {
        disciplineRepository.deleteById(id);
    }
}
