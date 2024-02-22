package com.example.schoolmanagementsystem.model;

import jakarta.persistence.*;

@Entity
@Table(name="roles_table")
public class RolesModel {

    @Id
    @Column(name="roles_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

}
