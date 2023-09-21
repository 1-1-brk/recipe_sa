package com.example.rsa_app.DTOs;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipeDTO {
    private int id;
    private String name;
    private String instructions;
    private String category;
    private String cook_time;
    private Date created_at;
    private String username; //who created
}
