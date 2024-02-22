package com.example.schoolmanagementsystem.controller;

import com.example.schoolmanagementsystem.model.UsersModel;
import com.example.schoolmanagementsystem.service.UsersService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
public class UsersController {


    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/register")
    public String getRegisterPage(Model model) {
        model.addAttribute("registerRequest", new UsersModel());
        return "register_page";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/login")
    public String getLoginPage(Model model) {
        model.addAttribute("loginRequest", new UsersModel());
        return "login_page.html";
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public String register(@RequestBody UsersModel usersModel) {
        System.out.println("register request " + usersModel);
        UsersModel registeredUser = usersService.registerUser(usersModel.getLogin(), usersModel.getPassword(), usersModel.getEmail());
        //return registeredUser == null ? "error_page" : "redirect:/login";
        return registeredUser.getLogin();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public String login(@RequestBody UsersModel usersModel) {
        System.out.println("login request " + usersModel);
        UsersModel authenticateUser = usersService.authenticate(usersModel.getEmail(), usersModel.getPassword());
        if(authenticateUser != null){
            return "Login Success";
        }else{
            return "Login Failed";
        }
       // return authenticateUser.getLogin();
    }

}
