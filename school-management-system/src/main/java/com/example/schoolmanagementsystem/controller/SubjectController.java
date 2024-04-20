package com.example.schoolmanagementsystem.controller;

import com.example.schoolmanagementsystem.model.School;
import com.example.schoolmanagementsystem.model.Subject;
import com.example.schoolmanagementsystem.service.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getAllSubjects() {
        List<Subject> subjects = subjectService.findAllSubjects();
        return ResponseEntity.ok(subjects);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/subjects")
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject) {
        Subject createdSubject = subjectService.createSubject(subject);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSubject);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/subjects/{id}")
    public ResponseEntity<Subject> updateSubjectById(@PathVariable Long id, @RequestBody Subject subject) {
        Subject updatedSubject = subjectService.updateSubject(id, subject);
        if (updatedSubject != null) {
            return ResponseEntity.ok(updatedSubject);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<Subject> deleteSubject(@PathVariable Long id) {
        boolean deleted = subjectService.deleteSubjectById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
