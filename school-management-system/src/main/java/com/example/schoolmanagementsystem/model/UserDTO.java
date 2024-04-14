package com.example.schoolmanagementsystem.model;

import lombok.Data;

import java.util.List;

@Data
public class UserDTO {

    private Long id;

    private String email;

    private String password;

    private Role role;

    private Long schoolId;

    private List<Long> subjectIds;
}