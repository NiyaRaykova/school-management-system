package com.example.schoolmanagementsystem.model;

import lombok.Data;

import java.util.List;

@Data
public class ProgramDTO {
    
    private Long id;

    private String name;

    private List<Long> subjects;
}
