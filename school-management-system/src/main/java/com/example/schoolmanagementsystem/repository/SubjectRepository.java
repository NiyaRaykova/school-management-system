package com.example.schoolmanagementsystem.repository;
import com.example.schoolmanagementsystem.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {

    Optional<Subject> findByName(String name);

    Optional<Subject> findById(Long subject_id);

    void deleteById(Long subject_id);

    List<Subject> findAll();
}
