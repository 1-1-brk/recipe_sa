package com.example.rsa_app.Services;

import com.example.rsa_app.DTOs.RecipeDTO;
import com.example.rsa_app.Entities.Recipe;

import java.util.List;

public interface RecipeService {

    List<RecipeDTO> findAllSortBy(String sortBy);

    List<RecipeDTO> findAllOfUserSortBy(int user_id, String sortBy);

    Recipe findById(int lookUpId);

    void saveAll(List<Recipe> recipeList);

    Recipe save(Recipe theEmp);

    void deleteById(int id);

    List<RecipeDTO> getAllRecipesOfUser(int user_id);

    RecipeDTO getRandomByCategory(String category);
}
