package com.example.springudemy1.Controllers;


import com.example.springudemy1.Entities.MyUser;
import com.example.springudemy1.Repositories.UserRepository;
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
