package com.example.schoolmanagementsystem.controller;

import com.example.schoolmanagementsystem.model.LoginResponse;
import com.example.schoolmanagementsystem.model.User;
import com.example.schoolmanagementsystem.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody User user) {
        // TODO we should return somewhat of an error message
        // TODO limit creating of ADMIN roles and block with 401.
        // TODO check if usser, email and role are present. This should happen here and not in the repo or service
        System.out.println("register request " + user);
        User registeredUser = userService.registerUser(user.getPassword(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(true);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginEmployee(@RequestBody User user) {
        User authenticatedUser = userService.authenticate(user.getEmail(), user.getPassword());
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
