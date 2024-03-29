package com.example.rsa_app.DTOs;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewRecipeDTO {
    private String name;
    private String instructions;
    private String category;
    private int cook_time;
    private String username; //who created
}
