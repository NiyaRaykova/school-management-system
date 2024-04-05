package com.example.schoolmanagementsystem.service;
import com.example.schoolmanagementsystem.model.School;
import com.example.schoolmanagementsystem.model.Subject;
import com.example.schoolmanagementsystem.repository.SchoolRepository;
import com.example.schoolmanagementsystem.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    public List<Subject> findAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject updateSubject(Long id, Subject subject) {
        // Check if school exists, perform update logic, handle exceptions as needed
        return subjectRepository.findById(id).map(existingSubject -> {
            existingSubject.setName(subject.getName());
            // copy other properties
            return subjectRepository.save(existingSubject);
        }).orElseThrow(() -> new RuntimeException("Subject not found with id " + id)); // Consider a more specific exception
    }

    public Subject createSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public boolean deleteSubjectById(Long id) {
        Optional<Subject> userOptional = subjectRepository.findById(id);
        if (userOptional.isPresent()) {
            subjectRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
