package com.example.schoolmanagementsystem.controller;

import com.example.schoolmanagementsystem.model.LoginResponse;
import com.example.schoolmanagementsystem.model.User;
import com.example.schoolmanagementsystem.service.UsersService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UsersService usersService;

    public UserController(UsersService usersService) {
        this.usersService = usersService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody User user) {
        System.out.println("register request " + user);
        User registeredUser = usersService.registerUser(user.getPassword(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(true);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginEmployee(@RequestBody User usersModel) {
        User authenticatedUser = usersService.authenticate(usersModel.getEmail(), usersModel.getPassword());
        if (authenticatedUser != null) {
            LoginResponse response = new LoginResponse();
            response.setRole(authenticatedUser.getRole());
            response.setStatus(true);
            response.setMessage("Success!");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse("Email does not exist", false, null));
        }
    }
}
