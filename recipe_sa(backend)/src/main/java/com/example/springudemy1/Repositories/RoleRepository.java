package com.example.springudemy1.Repositories;

import com.example.springudemy1.Entities.MyRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<MyRole, Integer> {
    MyRole findByRoleName(String roleName);
}
