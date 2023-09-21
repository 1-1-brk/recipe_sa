package com.example.rsa_app.Services;

import com.example.rsa_app.DTOs.RecipeDTO;
import com.example.rsa_app.Entities.Recipe;

import java.util.List;

public interface RecipeService {

    List<RecipeDTO> findAll();

    Recipe findById(int lookUpId);

    void saveAll(List<Recipe> recipeList);

    Recipe save(Recipe theEmp);

    void deleteById(int id);

    List<Recipe> findAllByUser_id(int user_id);

    RecipeDTO getRandomByCategory(String category);
}
