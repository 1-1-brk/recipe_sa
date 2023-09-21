package com.example.rsa_app.Repositories;

import com.example.rsa_app.Entities.MyRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<MyRole, Integer> {
    MyRole findByRoleName(String roleName);
}
