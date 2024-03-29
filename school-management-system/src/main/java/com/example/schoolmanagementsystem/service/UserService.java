package com.example.schoolmanagementsystem.service;

import com.example.schoolmanagementsystem.model.Role;
import com.example.schoolmanagementsystem.model.User;
import com.example.schoolmanagementsystem.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository usersRepository;

    public User registerUser( String password, String email, Role role){
        if (email == null || password == null || role == null){
            return null;
        }
        // TODO handle more gracefully if there is already present username with such email
        // TODO find a way to propagate error messages to the controller.
        User presentUser = usersRepository.findByEmail(email).orElse(null);
        if (presentUser != null) {
            return presentUser;
        }

        User usersModel = new User();
        usersModel.setPassword(password);
        usersModel.setEmail(email);
        usersModel.setRole(role);
        return usersRepository.save(usersModel);

    }

    public User updateUser(Long id, User user) {
        // Check if user exists, perform update logic, handle exceptions as needed
        return usersRepository.findById(id).map(existingUser -> {
            existingUser.setRole(user.getRole());
            existingUser.setEmail(user.getEmail());
            // copy other properties
            return usersRepository.save(existingUser);
        }).orElseThrow(() -> new RuntimeException("User not found with id " + id)); // Consider a more specific exception
    }

    public User updateUser(String email, User user) {
        // Check if user exists, perform update logic, handle exceptions as needed
        return usersRepository.findByEmail(email).map(existingUser -> {
            existingUser.setRole(user.getRole());
            existingUser.setEmail(user.getEmail());
            // copy other properties
            return usersRepository.save(existingUser);
        }).orElseThrow(() -> new RuntimeException("User not found with email " + email)); // Consider a more specific exception
    }

    public boolean deleteUserById(Long id) {
        Optional<User> userOptional = usersRepository.findById(id);
        if (userOptional.isPresent()) {
            usersRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public User authenticate(String email, String password){
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
