package com.example.schoolmanagementsystem.model;
import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Data
@Table(name="subjects_table")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private Long id;

    @Column(length = 45)
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "subjects")
    private List<User> users;

}
