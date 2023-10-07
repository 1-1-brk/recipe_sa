package com.example.rsa_app.Repositories;

import com.example.rsa_app.Entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findAllByUser_id(int user_id);
    List<Recipe> getRecipesByCategory_Name(String category);
//    @Query("SELECT r FROM Recipe r ORDER BY r.name ASC")
    List<Recipe> findAllByOrderByNameAsc();
    List<Recipe> findAllByOrderByNameDesc();
    List<Recipe> findAllByOrderByCreatedAtAsc();
    List<Recipe> findAllByOrderByCreatedAtDesc();
    List<Recipe> findAllByOrderByUpdatedAtAsc();
    List<Recipe> findAllByOrderByUpdatedAtDesc();
    List<Recipe> findAllByOrderByCookTimeAsc();
    List<Recipe> findAllByOrderByCookTimeDesc();

    List<Recipe> findAllByUser_IdOrderByNameAsc(int user_id);
    List<Recipe> findAllByUser_IdOrderByNameDesc(int user_id);
    List<Recipe> findAllByUser_IdOrderByCreatedAtAsc(int user_id);
    List<Recipe> findAllByUser_IdOrderByCreatedAtDesc(int user_id);
    List<Recipe> findAllByUser_IdOrderByUpdatedAtAsc(int user_id);
    List<Recipe> findAllByUser_IdOrderByUpdatedAtDesc(int user_id);
    List<Recipe> findAllByUser_IdOrderByCookTimeAsc(int user_id);
    List<Recipe> findAllByUser_IdOrderByCookTimeDesc(int user_id);

}
