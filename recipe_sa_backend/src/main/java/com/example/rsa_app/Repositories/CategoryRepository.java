package com.example.rsa_app.Repositories;

import com.example.rsa_app.Entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Category findCategoryByName(String name);
}
