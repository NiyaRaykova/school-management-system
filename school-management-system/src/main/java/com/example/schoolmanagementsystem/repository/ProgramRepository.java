package com.example.schoolmanagementsystem.repository;
import com.example.schoolmanagementsystem.model.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {

    Optional<Program> findByName(String name);

    Optional<Program> findById(Long program_id);

    void deleteById(Long program_id);

    List<Program> findAll();
}
