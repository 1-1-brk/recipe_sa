package com.example.springudemy1.DAOs;

import com.example.springudemy1.Entities.Recipe;

import java.util.List;


public interface EmployeeDAO {

    List<Recipe> findAll();

    Recipe findById(int lookUpId);

    Recipe save(Recipe theEmp);

    void deleteById(int id);


}
