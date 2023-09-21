package com.example.rsa_app.Repositories;

import com.example.rsa_app.Entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findAllByUser_id(int user_id);
    List<Recipe> getRecipesByCategory_Name(String category);
}
