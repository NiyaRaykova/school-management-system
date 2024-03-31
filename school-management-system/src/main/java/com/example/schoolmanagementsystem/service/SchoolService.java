package com.example.schoolmanagementsystem.service;
import com.example.schoolmanagementsystem.model.School;
import com.example.schoolmanagementsystem.model.User;
import com.example.schoolmanagementsystem.repository.SchoolRepository;
import com.example.schoolmanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SchoolService {

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private UserRepository userRepository;

    public List<School> findAllSchools() {
        return schoolRepository.findAll();
    }

    public School updateSchool(Long id, School school) {
        // Check if school exists, perform update logic, handle exceptions as needed
        return schoolRepository.findById(id).map(existingSchool -> {
            existingSchool.setName(school.getName());
            existingSchool.setAddress(school.getAddress());
            // copy other properties
            return schoolRepository.save(existingSchool);
        }).orElseThrow(() -> new RuntimeException("School not found with id " + id)); // Consider a more specific exception
    }

    public School createSchool(School school) {
        return schoolRepository.save(school);
    }

    public boolean deleteSchoolById(Long id) {
        Optional<School> userOptional = schoolRepository.findById(id);
        if (userOptional.isPresent()) {
            schoolRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public void assignSchoolToUser(Long schoolId, Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        School school = schoolRepository.findById(schoolId).orElse(null);

        if (user != null && school != null) {
            user.setSchool(school);
            userRepository.save(user);
        } else {
            // Handle error (e.g., student or school not found)
        }
    }

}
