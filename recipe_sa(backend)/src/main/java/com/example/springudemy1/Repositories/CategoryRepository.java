package com.example.springudemy1.Repositories;

import com.example.springudemy1.Entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Category findCategoryByName(String name);
}
