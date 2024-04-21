package com.example.schoolmanagementsystem.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name="users_table")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(length = 45)
    private String email;

    @Column(length = 45)
    private String password;

    @Column(length = 45)
    private String name;

    @Column(length = 45)
    private Integer schoolClass;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private School school;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_subjects",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private Set<Subject> subjects;
}
