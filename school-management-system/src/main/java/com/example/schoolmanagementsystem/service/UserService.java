package com.example.schoolmanagementsystem.service;

import com.example.schoolmanagementsystem.exceptions.UserAlreadyExistsException;
import com.example.schoolmanagementsystem.model.Role;
import com.example.schoolmanagementsystem.model.User;
import com.example.schoolmanagementsystem.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository usersRepository;


    public User registerUser(String password, String email, String name, Role role) {
        if (email == null || password == null || role == null || name == null) {
            throw new IllegalArgumentException("Invalid input: Email, password, name, or role is null");
        }

        // Check if a user with the provided email already exists
        Optional<User> existingUserOptional = usersRepository.findByEmail(email);
        if (existingUserOptional.isPresent()) {
            throw new
                    UserAlreadyExistsException("User with this email already exists: " + email);
        }

        // Create a new user entity with the provided details
        User newUser = new User();
        newUser.setPassword(password);
        newUser.setEmail(email);
        newUser.setRole(role);
        newUser.setName(name);

        // Save the new user to the repository
        return usersRepository.save(newUser);
    }

    public User updateUser(Long id, User user) {
        return usersRepository.findById(id).map(existingUser -> {
            existingUser.setRole(user.getRole());
            existingUser.setEmail(user.getEmail());

            if (user.getSchoolClass() != null) {
                existingUser.setSchoolClass(user.getSchoolClass());
            }

            if (user.getName() != null) {
                existingUser.setName(user.getName());
            }

            if (user.getSchool() != null) {
                existingUser.setSchool(user.getSchool());
            }
            if (user.getPrograms() != null) {
                existingUser.setPrograms(user.getPrograms());
            }
            return usersRepository.save(existingUser);
        }).orElseThrow(() -> new RuntimeException(
                "User not found with id " + id)); // Consider a more specific exception
    }

    public boolean deleteUserById(Long id) {
        Optional<User> userOptional = usersRepository.findById(id);
        if (userOptional.isPresent()) {
            usersRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public User authenticate(String email, String password) {
        return usersRepository.findByEmailAndPassword(email, password).orElse(null);
    }

    public List<User> findAllUsers() {
        return usersRepository.findAll();
    }

    public Optional<User> findUserByID(Long id) {
        return usersRepository.findById(id);
    }

    public Optional<User> findUserByEmail(String email) {
        return usersRepository.findByEmail(email);
    }
}
