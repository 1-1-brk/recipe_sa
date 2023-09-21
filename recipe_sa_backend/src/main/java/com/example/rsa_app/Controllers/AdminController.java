package com.example.rsa_app.Controllers;


import com.example.rsa_app.Entities.MyUser;
import com.example.rsa_app.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/adminPage")
public class AdminController {

    private UserRepository userRepository;

    @Autowired
    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/allUsers")
    public List<MyUser> getAllUsers() {
        return userRepository.findAll();
    }
}
