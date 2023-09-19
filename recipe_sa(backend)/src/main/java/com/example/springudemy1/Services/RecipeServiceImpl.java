package com.example.springudemy1.Services;

import com.example.springudemy1.DTOs.RecipeDTO;
import com.example.springudemy1.Entities.Recipe;
import com.example.springudemy1.Repositories.RecipeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class RecipeServiceImpl implements RecipeService {

//    private EmployeeDAO employeeDAO;
    private RecipeRepository recipeRepository;
    private CategoryService categoryService;
    private static final ObjectMapper MAPPER = new ObjectMapper();

//    @Autowired
//    public EmployeeServiceImpl (EmployeeDAO theEmployeeDAO){
//        employeeDAO = theEmployeeDAO;
//    }

    @Autowired
    public RecipeServiceImpl(RecipeRepository theEmpRepo, CategoryService theCatServ){
        recipeRepository = theEmpRepo;
        categoryService = theCatServ;
    }

    public List<Recipe> findAllByUser_id(int user_id){
        return recipeRepository.findAllByUser_id(user_id);
    }

    @Override
    public RecipeDTO getRandomByCategory(String category) {
        List<Recipe> recipes = recipeRepository.getRecipesByCategory_Name(category);
        if (!recipes.isEmpty()){
            int randInd = new Random().nextInt(recipes.size());
            Recipe recipe = recipes.get(randInd);
            RecipeDTO recipeDTO = RecipeDTO.builder()
                    .id(recipe.getId())
                    .name(recipe.getName())
                    .category(recipe.getCategory().getName())
                    .cook_time(recipe.getCook_time())
                    .instructions(recipe.getInstructions())
                    .created_at(recipe.getCreated_at())
                    .username(recipe.getUser().getUsername())
                    .build();
            return recipeDTO;
        }
        return null;
    }

    @Override
    public List<RecipeDTO> findAll() {
        List<RecipeDTO> recipeDTOList = new ArrayList<>();
        List <Recipe> recipesAll= recipeRepository.findAll();
        for (Recipe recipe : recipesAll){
            RecipeDTO recipeDTO = RecipeDTO.builder()
                    .id(recipe.getId())
                    .name(recipe.getName())
                    .category(recipe.getCategory().getName())
                    .cook_time(recipe.getCook_time())
                    .instructions(recipe.getInstructions())
                    .created_at(recipe.getCreated_at())
                    .username(recipe.getUser().getUsername())
                    .build();
            recipeDTOList.add(recipeDTO);
        }
        return recipeDTOList;
    }

    @Override
    public Recipe findById(int lookUpId) {
        Optional<Recipe> res = recipeRepository.findById(lookUpId);
        Recipe toReturn = null;
        if (res.isPresent()){
            toReturn = res.get();
        }
        else {
            throw new RuntimeException("Employee not found - " + lookUpId);
        }
        return toReturn;
    }

    @Transactional
    @Override
    public Recipe save(Recipe theRec) {
//        int catecategoryService.findByName(theRec.getName());
        return recipeRepository.save(theRec);
    }

    @Transactional

    public void saveAll(List<Recipe> recipeList){
        for(Recipe rec : recipeList){
            recipeRepository.save(rec);
        }
    }

    @Transactional
    @Override
    public void deleteById(int id) {
        recipeRepository.deleteById(id);
    }
}
