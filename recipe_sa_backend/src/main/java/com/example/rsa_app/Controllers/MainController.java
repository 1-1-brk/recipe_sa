package com.example.rsa_app.Controllers;

import com.example.rsa_app.DTOs.NewRecipeDTO;
import com.example.rsa_app.DTOs.RecipeDTO;
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
    public Recipe addRecipe (@RequestBody NewRecipeDTO recipeDTO) throws IOException {
        Category category = categoryService.findByName(recipeDTO.getCategory());
        MyUser user = userService.findUserByUsername(recipeDTO.getUsername());
        Recipe newRecipe = new Recipe();
//                .id(0)
                newRecipe.setName(recipeDTO.getName());
                newRecipe.setInstructions(recipeDTO.getInstructions());
                newRecipe.setCookTime(recipeDTO.getCook_time());
                newRecipe.setCategory(category);
                newRecipe.setUser(user);
//        log.info("RECIPE STRING: "+newRecipe.toString());
        Recipe dbRecipe = recipeService.save(newRecipe);
        return dbRecipe;
    }

    @PutMapping("/updateRecipe")
    public Recipe updateRecipe (@RequestBody Recipe theRec){
        Recipe dbRecipe = recipeService.save(theRec);
        return dbRecipe;
    }

    @DeleteMapping("/deleteRecipe-{recId}")
    public void deleteRecipe(@PathVariable int recId){
        log.info("Deleting Recipe by ID: " + recId);
        recipeService.deleteById(recId);
    }





}
