package com.example.rsa_app.DAOs;

import com.example.rsa_app.Entities.Recipe;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


//@Repository
public class EmployeeDAOImpl implements EmployeeDAO{

//    @Autowired
//    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public EmployeeDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Recipe> findAll() {
        TypedQuery<Recipe> query = entityManager.createQuery( "from Employee", Recipe.class);

        List<Recipe> emps = query.getResultList();

        return emps;
    }

    @Override
    public Recipe findById(int lookUpId) {
        TypedQuery<Recipe> query = entityManager.createQuery( "from Employee where id = :someId", Recipe.class);
//        Employee theEmp = entityManager.find(Employee.class, lookUpId);
        query.setParameter("someId", lookUpId);
//        query.getSingleResult();
        return query.getSingleResult();
    }

    @Override
    public Recipe save(Recipe theEmp) {
        Recipe dbRecipe = entityManager.merge(theEmp);
        return dbRecipe;
    }

    @Override
    public void deleteById(int id) {
        Recipe emp = entityManager.find(Recipe.class, id);
        entityManager.remove(emp);
    }
}
