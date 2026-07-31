package com.dan.controller;

import com.dan.model.Discipline;
import com.dan.model.dto.ResponseMessage;
import com.dan.service.DisciplineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disciplines")
public class DisciplineController {
    @Autowired
    private DisciplineService disciplineService;

    @GetMapping("")
    public ResponseEntity<List<Discipline>> getAllDisciplines() {
        return ResponseEntity.ok(disciplineService.getAllDisciplines());
    }

    @PostMapping("/admin/create-discipline")
    public ResponseEntity<Discipline> createDiscipline(@RequestBody Discipline discipline) {
        return ResponseEntity.ok(disciplineService.createDiscipline(discipline));
    }

    @PutMapping("/admin/update-discipline/{id}")
    public ResponseEntity<Discipline> updateDiscipline(@PathVariable("id") Long id, @RequestBody Discipline discipline) {
        return ResponseEntity.ok(disciplineService.updateDiscipline(discipline, id));
    }

    @DeleteMapping("/admin/delete-discipline/{id}")
    public ResponseEntity<ResponseMessage> deleteDiscipline(@PathVariable("id") Long id) {
        disciplineService.deleteDiscipline(id);
        return new ResponseEntity<>(new ResponseMessage("Discipline deleted successfully"), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Discipline> getDisciplineById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(disciplineService.getDisciplineById(id));
    }
}
