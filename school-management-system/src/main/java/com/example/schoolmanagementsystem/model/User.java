package com.example.schoolmanagementsystem.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="users_table")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45)
    private String email;

    @Column(length = 45)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private School school;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;
}
