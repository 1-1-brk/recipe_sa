package com.example.springudemy1.Controllers;


import com.example.springudemy1.Entities.Category;
import com.example.springudemy1.Services.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
//@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST})
@RequestMapping("/categories")
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
