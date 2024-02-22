package com.example.schoolmanagementsystem.repository;


import com.example.schoolmanagementsystem.model.UsersModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<UsersModel, Long> {

    Optional<UsersModel> findByEmailAndPassword(String email, String password);

}
