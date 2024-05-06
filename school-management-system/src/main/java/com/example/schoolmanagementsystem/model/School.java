package com.example.schoolmanagementsystem.model;
import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Data
@Table(name="schools_table")
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "school_id")
    private Long id;

    @Column(length = 45)
    private String name;

    @Column(length = 45)
    private String address;

    @JsonIgnore
    @OneToMany(mappedBy = "school")
    private List<User> users;
}
