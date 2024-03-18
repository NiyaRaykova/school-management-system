package com.example.schoolmanagementsystem.controller;

import com.example.schoolmanagementsystem.model.School;
import com.example.schoolmanagementsystem.service.SchoolService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SchoolController {

    private final SchoolService schoolService;

    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/schools")
    public ResponseEntity<List<School>> getAllSchools() {
        List<School> schools = schoolService.findAllSchools();
        return ResponseEntity.ok(schools);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/schools")
    public ResponseEntity<School> updateSchoolById(@PathVariable Long id, @RequestBody School school) {
        School updatedSchool = schoolService.updateSchool(id, school);
        if (updatedSchool != null) {
            return ResponseEntity.ok(updatedSchool);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/schools")
    public ResponseEntity<School> createSchool(@RequestBody School school) {
        School createdSchool = schoolService.createSchool(school);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSchool);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/schools/{id}")
    public ResponseEntity<School> deleteSchool(@PathVariable Long id) {
        boolean deleted = schoolService.deleteSchoolById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
