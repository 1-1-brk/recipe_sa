package com.example.springudemy1.Repositories;

import com.example.springudemy1.Entities.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<MyUser, Integer> {
    MyUser findUserByUsername(String username);
}
