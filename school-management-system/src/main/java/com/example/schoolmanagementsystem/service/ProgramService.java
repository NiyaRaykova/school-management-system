package com.example.schoolmanagementsystem.service;
import com.example.schoolmanagementsystem.model.Program;
import com.example.schoolmanagementsystem.model.User;
import com.example.schoolmanagementsystem.repository.ProgramRepository;
import com.example.schoolmanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramService {

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Program> findAllPrograms() {
        return programRepository.findAll();
    }

    public Program updateProgram(Long id, Program program) {
        // Check if program exists, perform update logic, handle exceptions as needed
        return programRepository.findById(id).map(existingProgram -> {
            existingProgram.setName(program.getName());
            // copy other properties
            return programRepository.save(existingProgram);
        }).orElseThrow(() -> new RuntimeException("Program not found with id " + id)); // Consider a more specific exception
    }

    public Program createProgram(Program program) {
        return programRepository.save(program);
    }

    public boolean deleteProgramById(Long id) {
        Optional<Program> programOptional = programRepository.findById(id);
        if (programOptional.isPresent()) {
            programRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public void assignProgramToUser(Long programId, Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        Program program = programRepository.findById(programId).orElse(null);

        if (user != null && program != null) {
           // user.setSchool(school);
            userRepository.save(user);
        } else {
            // Handle error (e.g., student or school not found)
        }
    }

    public Optional<Program> getProgramById(Long id) {
        return programRepository.findById(id);
    }

    public Optional<Program> findProgramByID(Long id) {
        return programRepository.findById(id);
    }

}
