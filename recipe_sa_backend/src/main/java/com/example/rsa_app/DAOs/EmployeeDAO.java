package com.example.rsa_app.DAOs;

import com.example.rsa_app.Entities.Recipe;

import java.util.List;


public interface EmployeeDAO {

    List<Recipe> findAll();

    Recipe findById(int lookUpId);

    Recipe save(Recipe theEmp);

    void deleteById(int id);


}
