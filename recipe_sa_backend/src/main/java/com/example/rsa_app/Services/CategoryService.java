package com.example.rsa_app.Services;

import com.example.rsa_app.Entities.Category;

import java.util.List;

public interface CategoryService {

    Category findByName(String name);

    List<Category> findAll();

    Category findById(int lookUpId);

    Category save(Category theCat);

    void deleteById(int id);

}
