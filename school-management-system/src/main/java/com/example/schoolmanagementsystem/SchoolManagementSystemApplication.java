package com.example.schoolmanagementsystem;

import com.example.schoolmanagementsystem.model.Role;
import com.example.schoolmanagementsystem.service.UserService;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SchoolManagementSystemApplication {

	@Autowired
	UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(SchoolManagementSystemApplication.class, args);
	}

	@PostConstruct
	private void createAdmin() {
		userService.registerUser("pass", "admin", "Ivan Ivanov", Role.ADMIN);
		userService.registerUser("pass", "teacher", "Ivan Ivanov", Role.TEACHER);
		userService.registerUser("pass", "student", "Ivan Ivanov", Role.STUDENT);
		userService.registerUser("pass", "parent","Ivan Ivanov", Role.PARENT);
		userService.registerUser("pass", "director","Ivan Ivanov", Role.DIRECTOR);
	}
}