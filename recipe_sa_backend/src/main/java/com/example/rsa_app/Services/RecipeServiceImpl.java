package com.example.rsa_app.Services;

import com.example.rsa_app.DTOs.RecipeDTO;
import com.example.rsa_app.Entities.Recipe;
import com.example.rsa_app.Repositories.RecipeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Slf4j
@Repository
public class RecipeServiceImpl implements RecipeService {

//    private EmployeeDAO employeeDAO;
    private RecipeRepository recipeRepository;
    private EntityManager entityManager;
    private CategoryService categoryService;
    private static final ObjectMapper MAPPER = new ObjectMapper();

//    @Autowired
//    public EmployeeServiceImpl (EmployeeDAO theEmployeeDAO){
//        employeeDAO = theEmployeeDAO;
//    }

    @Autowired
    public RecipeServiceImpl(RecipeRepository theEmpRepo, EntityManager theEm, CategoryService theCatServ){
        recipeRepository = theEmpRepo;
        entityManager = theEm;
        categoryService = theCatServ;
    }

    public List<RecipeDTO> getAllRecipesOfUser(int user_id){
        List<Recipe> recipesAll = recipeRepository.findAllByUser_id(user_id);
        List<RecipeDTO> recipeDTOList = new ArrayList<>();
        for (Recipe recipe : recipesAll){
            recipeDTOList.add(RecipeDTO.recipeToRecipeDTO(recipe));
        }
        return recipeDTOList;
    }

    @Override
    public RecipeDTO getRandomByCategory(String category) {
        List<Recipe> recipes = recipeRepository.getRecipesByCategory_Name(category);
        if (!recipes.isEmpty()){
            int randInd = new Random().nextInt(recipes.size());
            Recipe recipe = recipes.get(randInd);
            return RecipeDTO.recipeToRecipeDTO(recipe);
        }
        return null;
    }

    @Override
    public List<RecipeDTO> findAllSortBy(String sortBy) {
        List<RecipeDTO> recipeDTOList = new ArrayList<>();
        List <Recipe> recipesAll; // = new ArrayList<>(); //recipeRepository.findAll();
        log.info("\n\n\nSortOption: " + sortBy);
        switch(sortBy) {
            case "0":
                recipesAll = recipeRepository.findAll();
                break;
            case "1":
//                entityManager.clear();
//                TypedQuery<Recipe> query =
//                        entityManager.createQuery("select r FROM Recipe r ORDER BY r.name ASC", Recipe.class);
//                recipesAll = query.getResultList();
//                Sort nameAsc = Sort.by(Sort.Direction.ASC, "name");
//                recipesAll = recipeRepository.findAll(nameAsc);
                recipesAll = recipeRepository.findAllByOrderByNameAsc();
                break;
            case "2":
                recipesAll = recipeRepository.findAllByOrderByNameDesc();
                break;
            case "3":
                recipesAll = recipeRepository.findAllByOrderByCreatedAtAsc();
                break;
            case "4":
                recipesAll = recipeRepository.findAllByOrderByCreatedAtDesc();
                break;
            case "5":
                recipesAll = recipeRepository.findAllByOrderByUpdatedAtAsc();
                break;
            case "6":
                recipesAll = recipeRepository.findAllByOrderByUpdatedAtDesc();
                break;
            case "7":
                recipesAll = recipeRepository.findAllByOrderByCookTimeAsc();
                break;
            case "8":
                recipesAll = recipeRepository.findAllByOrderByCookTimeDesc();
                break;
            default:
              throw new IllegalArgumentException("Invalid sortBy value: " + sortBy);
        }

        for (Recipe recipe : recipesAll){
            recipeDTOList.add(RecipeDTO.recipeToRecipeDTO(recipe));
        }
        return recipeDTOList;
    }

    @Override
    public List<RecipeDTO> findAllOfUserSortBy(int user_id, String sortBy) {
        List<RecipeDTO> recipeDTOList = new ArrayList<>();
        List <Recipe> recipesAll; // = new ArrayList<>(); //recipeRepository.findAll();
        log.info("\n\n\nSortOption: " + sortBy);
        switch(sortBy) {
            case "0":
                recipesAll = recipeRepository.findAllByUser_id(user_id);
                break;
            case "1":
//                entityManager.clear();
//                TypedQuery<Recipe> query =
//                        entityManager.createQuery("select r FROM Recipe r ORDER BY r.name ASC", Recipe.class);
//                recipesAll = query.getResultList();
//                Sort nameAsc = Sort.by(Sort.Direction.ASC, "name");
//                recipesAll = recipeRepository.findAll(nameAsc);
                recipesAll = recipeRepository.findAllByUser_IdOrderByNameAsc(user_id);
                break;
            case "2":
                recipesAll = recipeRepository.findAllByUser_IdOrderByNameDesc(user_id);
                break;
            case "3":
                recipesAll = recipeRepository.findAllByUser_IdOrderByCreatedAtAsc(user_id);
                break;
            case "4":
                recipesAll = recipeRepository.findAllByUser_IdOrderByCreatedAtDesc(user_id);
                break;
            case "5":
                recipesAll = recipeRepository.findAllByUser_IdOrderByUpdatedAtAsc(user_id);
                break;
            case "6":
                recipesAll = recipeRepository.findAllByUser_IdOrderByUpdatedAtDesc(user_id);
                break;
            case "7":
                recipesAll = recipeRepository.findAllByUser_IdOrderByCookTimeAsc(user_id);
                break;
            case "8":
                recipesAll = recipeRepository.findAllByUser_IdOrderByCookTimeDesc(user_id);
                break;
            default:
              throw new IllegalArgumentException("Invalid sortBy value: " + sortBy);
        }

        for (Recipe recipe : recipesAll){
            recipeDTOList.add(RecipeDTO.recipeToRecipeDTO(recipe));
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
            throw new RuntimeException("Recipe not found - " + lookUpId);
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
