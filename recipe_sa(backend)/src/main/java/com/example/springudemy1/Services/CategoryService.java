package com.example.springudemy1.Services;

import com.example.springudemy1.Entities.Category;

import java.util.List;

public interface CategoryService {

    Category findByName(String name);

    List<Category> findAll();

    Category findById(int lookUpId);

    Category save(Category theCat);

    void deleteById(int id);

}
