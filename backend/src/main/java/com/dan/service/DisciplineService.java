package com.dan.service;

import com.dan.model.Discipline;

import java.util.List;

public interface DisciplineService {
    List<Discipline> getAllDisciplines();
    Discipline getDisciplineById(Long id);
    Discipline createDiscipline(Discipline discipline);
    Discipline updateDiscipline(Discipline discipline, Long id);
    void deleteDiscipline(Long id);
}
