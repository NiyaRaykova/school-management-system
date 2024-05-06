package com.example.schoolmanagementsystem.repository;
import com.example.schoolmanagementsystem.model.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SchoolRepository extends JpaRepository<School, Long> {

    Optional<School> findByName(String name);

    Optional<School> findById(Long school_id);

    void deleteById(Long school_id);

    List<School> findAll();
}
