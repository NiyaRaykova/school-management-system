package com.example.schoolmanagementsystem.model;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;

    private String email;

    private String password;

    private Role role;

    private Long schoolId;

    private Subject subject;
}