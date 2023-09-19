package com.example.springudemy1.Services;

import com.example.springudemy1.Entities.Category;
import com.example.springudemy1.Repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

//    private EmployeeDAO employeeDAO;
    private CategoryRepository categoryRepository;

//    @Autowired
//    public EmployeeServiceImpl (EmployeeDAO theEmployeeDAO){
//        employeeDAO = theEmployeeDAO;
//    }

    @Autowired
    public CategoryServiceImpl(CategoryRepository theCategoryRepository){
        categoryRepository = theCategoryRepository;
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(int lookUpId) {
        Optional<Category> res = categoryRepository.findById(lookUpId);
        Category toReturn = null;
        if (res.isPresent()){
            toReturn = res.get();
        }
        else {
            throw new RuntimeException("Category not found - " + lookUpId);
        }
        return toReturn;
    }

    @Override
    public Category findByName(String name){
        Optional<Category> res = Optional.of(categoryRepository.findCategoryByName(name));
        Category toReturn = null;
        if (res.isPresent()){
            toReturn = res.get();
        }
        else {
            throw new RuntimeException("Category not found - " + name);
        }
        return toReturn;
    }

    @Transactional
    @Override
    public Category save(Category theCat) {
        return categoryRepository.save(theCat);
    }

    @Transactional
    @Override
    public void deleteById(int id) {
        categoryRepository.deleteById(id);
    }
}
