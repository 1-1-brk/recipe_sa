package com.example.rsa_app.Controllers;


import com.example.rsa_app.Entities.Category;
import com.example.rsa_app.Services.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
//@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST})
@RequestMapping("/api/categories")
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }



    @GetMapping("/all")
    private List<Category> getAllCategories(){
        log.info("ALL_CATEGORIES_REQUESTED");
        return categoryService.findAll();
    }


}
