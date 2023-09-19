package com.example.springudemy1.DTOs;


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
    private String cook_time;
    private String username; //who created
}
