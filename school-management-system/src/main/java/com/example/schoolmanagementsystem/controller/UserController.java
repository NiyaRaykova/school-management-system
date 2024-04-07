package com.example.schoolmanagementsystem.controller;

import com.example.schoolmanagementsystem.model.LoginResponse;
import com.example.schoolmanagementsystem.model.User;
import com.example.schoolmanagementsystem.model.UserDTO;
import com.example.schoolmanagementsystem.service.SchoolService;
import com.example.schoolmanagementsystem.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final SchoolService schoolService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody User user) {
        // TODO we should return somewhat of an error message
        // TODO limit creating of ADMIN roles and block with 401.
        // TODO check if usser, email and role are present. This should happen here and not in the repo or service
        System.out.println("register request " + user);
        User registeredUser = userService.registerUser(user.getPassword(), user.getEmail(),
                user.getRole());
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse("Email does not exist", false, null));
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/users/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.findUserByID(id);
        return ResponseEntity.ok(user);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/users/email/{email}")
    public ResponseEntity<Optional<User>> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.findUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Long id,
            @RequestBody UserDTO userDto) {
        User updatedUser;
        User user = this.userService.findUserByID(userDto.getId()).orElse(null);

        if (userDto.getSchoolId() != null && user != null) {
            user.setSchool(schoolService.getSchoolById(userDto.getSchoolId()).orElse(null));
        }

        updatedUser = userService.updateUser(id, user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUserById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
