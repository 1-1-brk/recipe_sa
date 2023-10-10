package com.example.rsa_app.DTOs;


import com.example.rsa_app.Entities.Recipe;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRecipeDTO {
    private int id;
    private String name;
    private String instructions;
    private String category;
    private int cook_time;
//    private Date created_at;
//    private Date updated_at;
    private String username;

}
