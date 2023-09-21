package com.example.rsa_app.Repositories;

import com.example.rsa_app.Entities.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<MyUser, Integer> {
    MyUser findUserByUsername(String username);
}
