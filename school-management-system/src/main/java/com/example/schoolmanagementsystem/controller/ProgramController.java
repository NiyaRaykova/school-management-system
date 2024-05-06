package com.example.schoolmanagementsystem.controller;
import com.example.schoolmanagementsystem.model.Program;
import com.example.schoolmanagementsystem.model.ProgramDTO;
import com.example.schoolmanagementsystem.model.Subject;
import com.example.schoolmanagementsystem.service.ProgramService;
import com.example.schoolmanagementsystem.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
public class ProgramController {

    private final ProgramService programService;

    private final SubjectService subjectService;


    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/programs")
    public ResponseEntity<List<Program>> getAllPrograms() {
        List<Program> programs = programService.findAllPrograms();
        return ResponseEntity.ok(programs);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/programs/{id}")
    public ResponseEntity<Program> updateProgramById(@PathVariable Long id, @RequestBody ProgramDTO programDto) {
        Program program = programService.findProgramByID(id).orElse(null);

        if (programDto.getSubjects() != null && !programDto.getSubjects().isEmpty()) {
            Set<Subject> subjects = subjectService.findSubjectsByIds(programDto.getSubjects());
            program.setSubjects(subjects);
        }

        if (programDto.getName() != null) {
            program.setName(programDto.getName());
        }

        Program updatedProgram = programService.updateProgram(id, program);
        if (updatedProgram != null) {
            return ResponseEntity.ok(updatedProgram);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/programs")
    public ResponseEntity<Program> createProgram(@RequestBody ProgramDTO programDto) {
        Program program = new Program();
        if (programDto == null) {
            return ResponseEntity.notFound().build();
        }

        if (programDto.getName() != null) {
            program.setName(programDto.getName());
        }

        if (programDto.getSubjects() != null && !programDto.getSubjects().isEmpty()) {
            Set<Subject> subjects = subjectService.findSubjectsByIds(programDto.getSubjects());
            program.setSubjects(subjects);
        }
        Program createdProgram = programService.createProgram(program);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProgram);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/programs/{id}")
    public ResponseEntity<Program> deleteProgram(@PathVariable Long id) {
        boolean deleted = programService.deleteProgramById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/programs/assign-program-to-user")
    public ResponseEntity<Void> assignProgramToUser(@RequestParam Long programId, @RequestParam Long userId) {
        programService.assignProgramToUser(programId, userId);
        return ResponseEntity.ok().build();
    }
}
