package com.example.schoolmanagementsystem.service;

import com.example.schoolmanagementsystem.model.Role;
import com.example.schoolmanagementsystem.model.User;
import com.example.schoolmanagementsystem.repository.UsersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UsersRepository usersRepository;

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

    public User authenticate(String email, String password){
        return usersRepository.findByEmailAndPassword(email, password).orElse(null);
    }
}
