package com.example.rsa_app.Controllers;

import com.example.rsa_app.DTOs.NewRecipeDTO;
import com.example.rsa_app.DTOs.RecipeDTO;
import com.example.rsa_app.DTOs.UpdateRecipeDTO;
import com.example.rsa_app.Entities.Category;
import com.example.rsa_app.Entities.MyUser;
import com.example.rsa_app.Entities.Recipe;
import com.example.rsa_app.Exceptions.AppException;
import com.example.rsa_app.Services.CategoryService;
import com.example.rsa_app.Services.RecipeService;
import com.example.rsa_app.Services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class MainController {

    private UserService userService;
    private RecipeService recipeService;
    private CategoryService categoryService;
    private static final ObjectMapper MAPPER = new ObjectMapper();


    @Autowired
    public MainController(RecipeService recServ, UserService userServ, CategoryService categoryService) {
        this.recipeService = recServ;
        this.userService = userServ;
        this.categoryService = categoryService;
    }

    @GetMapping("/getAll")
    private List<RecipeDTO> getAll(
            @RequestParam(name = "sortBy", required = false) String sortBy
    ){
//    private ResponseEntity<List<Recipe>> getAll(){
        log.info("GET_ALL_RESPONSE_REQUESTED sortBy: " + sortBy);
        if(sortBy == null){
            sortBy = "0";
        }
        return recipeService.findAllSortBy(sortBy);
//        return ResponseEntity.ok(recipeService.findAll());
    }

    @GetMapping("/adminPage")
    private String getAdminPage(){
        return "!!admin!!Page!!";
    }


    @GetMapping("/myRecipes-user")
    private List<RecipeDTO> getMyRecipes(
            @RequestParam(name = "user_id", required = true) int user_id,
            @RequestParam(name = "sortBy", required = true) String sortBy
    ){
//        ПОЗЖЕ ДОБАВИТЬ ПРОВЕРКА + НЕ НАЙДЕНО
        try {
            return recipeService.findAllOfUserSortBy(user_id, sortBy);
        } catch (AppException e) {
            return null;
        }
    }

    @GetMapping("/{recId}")
    private Recipe getById(@PathVariable int recId){
        return recipeService.findById(recId);
    }

    @GetMapping("/getRandomMenu")
    private ResponseEntity<List<RecipeDTO>> getRandomMenu(){
        log.info("got Random Menu Request");
        List<RecipeDTO> menu = new ArrayList<>();
        menu.add(recipeService.getRandomByCategory("breakfast"));
        menu.add(recipeService.getRandomByCategory("lunch"));
        menu.add(recipeService.getRandomByCategory("dessert"));
        menu.add(recipeService.getRandomByCategory("dinner"));
        log.info(("sending as Random Menu: " + menu.toString()));
        return ResponseEntity.ok().body(menu);
    }

    @PostMapping("/newRecipe")
    public RecipeDTO addRecipe (@RequestBody NewRecipeDTO recipeDTO) throws IOException {
        Category category = categoryService.findByName(recipeDTO.getCategory());
        MyUser user = userService.findUserByUsername(recipeDTO.getUsername());
        Recipe newRecipe = Recipe.builder()
//                .id(0)
                .name(recipeDTO.getName())
                .instructions(recipeDTO.getInstructions())
                .cookTime(recipeDTO.getCook_time())
                .category(category)
                .user(user)
                .build();
//        log.info("RECIPE STRING: "+newRecipe.toString());
        RecipeDTO dbRecipe = recipeService.save(newRecipe);
        return dbRecipe;
    }

    @PutMapping("/updateRecipe")
    public RecipeDTO updateRecipe (@RequestBody UpdateRecipeDTO recipeDTO){
        log.info("\n\n\nupdating recipe. received object: " + recipeDTO + "\n\n\n");
        Category category = categoryService.findByName(recipeDTO.getCategory());
        Recipe recipeToUpdate = recipeService.findById(recipeDTO.getId());
        recipeToUpdate.setName(recipeDTO.getName());
        recipeToUpdate.setInstructions(recipeDTO.getInstructions());
        recipeToUpdate.setCookTime(recipeDTO.getCook_time());
        recipeToUpdate.setCategory(category);
        RecipeDTO dbRecipe = recipeService.save(recipeToUpdate);
        return dbRecipe;
    }

    @DeleteMapping("/deleteRecipe-{recId}")
    public void deleteRecipe(@PathVariable int recId){
        log.info("Deleting Recipe by ID: " + recId);
        recipeService.deleteById(recId);
    }





}
