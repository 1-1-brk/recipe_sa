package com.example.rsa_app;

import com.example.rsa_app.Entities.Category;
import com.example.rsa_app.Entities.MyRole;
import com.example.rsa_app.Entities.Recipe;
import com.example.rsa_app.Entities.MyUser;
import com.example.rsa_app.Repositories.RoleRepository;
import com.example.rsa_app.Services.CategoryService;
import com.example.rsa_app.Services.RecipeService;
import com.example.rsa_app.Services.UserService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.HashSet;

@Slf4j
@SpringBootApplication
public class RecipeSA {

    private UserService userService;
    private CategoryService categoryService;
    private RecipeService recipeService;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;



    public static void main(String[] args) {
        SpringApplication.run(RecipeSA.class, args);
    }

    @Autowired
    public RecipeSA(UserService userService, CategoryService categoryService, RecipeService recipeService, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.categoryService = categoryService;
        this.recipeService = recipeService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }



    @PostConstruct
    public void addMockData(){

        log.info("ADDING_MOCK_DATA");

        roleRepository.save(new MyRole("ROLE_GUEST"));
        roleRepository.save(new MyRole("ROLE_USER"));
        roleRepository.save(new MyRole("ROLE_ADMIN"));

        MyRole role1 = roleRepository.findByRoleName("ROLE_GUEST");
        MyRole role2 = roleRepository.findByRoleName("ROLE_USER");
        MyRole role3 = roleRepository.findByRoleName("ROLE_ADMIN");


//        MyUser user1 = new MyUser("test_guest", null, null, null, new HashSet<>(Arrays.asList(role1)), new HashSet<>(Arrays.asList(role1));
//        MyUser user2 = new MyUser("t", passwordEncoder.encode("t"), "user@mail.wo", null, new HashSet<>(Arrays.asList(role2)));
//        MyUser user3 = new MyUser("admin", passwordEncoder.encode("adminpassword"), "admin@mail.wo", null, new HashSet<>(Arrays.asList(role3)));

//        MyUser user1 = MyUser.builder().username().password().email().profile_picture().roles().recipes().build();
        MyUser user2 = MyUser.builder().username("t").password(passwordEncoder.encode("t")).email("user@mail").profile_picture(null).roles(new HashSet<>(Arrays.asList(role2))).build();
        MyUser user3 = MyUser.builder().username("adm").password(passwordEncoder.encode("adm")).email("admin@mail").profile_picture(null).roles(new HashSet<>(Arrays.asList(role3))).build();



//        userService.save(user1);
        userService.save(user2);
        userService.save(user3);



        Category breakfast = new Category("Breakfast", "BreakfastBreakfastBreakfastBreakfastBreakfasts");
        Category lunch = new Category("Lunch", "LunchLunchLunchLunchLunchLunchLunchLunchLunchLunch");
        Category dinner = new Category("Dinner", "DinnerDinnerDinnerDinnerDinnerDinnerDinnerDinners");
        Category dessert = new Category("Dessert", "DessertDessertDessertDessertDessertDessertDesser");


        Recipe recipe1 = new Recipe("Classic Spaghetti Bolognese", "A hearty pasta dish with a rich meat sauce.", "45 minutes", dinner, user2);
        Recipe recipe2 = new Recipe("Baked Lemon Herb Salmon", "Healthy and delicious salmon seasoned with herbs and lemon.", "25 minutes", breakfast, user2);
        Recipe recipe3 = new Recipe("Homemade Margherita Pizza", "Simple and flavorful pizza topped with tomatoes, mozzarella, and basil.", "15 minutes", lunch, user2);
        Recipe recipe4 = new Recipe("Creamy Chicken Alfredo", "Creamy pasta dish with tender chicken and Alfredo sauce.", "30 minutes", dinner, user2);
        Recipe recipe5 = new Recipe("Fresh Berry Smoothie", "A refreshing smoothie made with mixed berries and yogurt.", "10 minutes", dessert, user2);
        Recipe recipe6 = new Recipe("Grilled Steak with Chimichurri Sauce", "Juicy grilled steak served with a zesty chimichurri sauce.", "35 minutes", dinner, user2);
        Recipe recipe7 = new Recipe("Vegetable Stir-Fry", "Colorful stir-fried vegetables with a savory sauce.", "20 minutes", lunch, user2);
        Recipe recipe8 = new Recipe("Oven-Baked Chicken Drumsticks", "Crispy and flavorful chicken drumsticks baked to perfection.", "40 minutes", dinner, user2);
        Recipe recipe9 = new Recipe("Avocado Toast", "Simple and delicious avocado toast topped with various toppings.", "10 minutes", breakfast, user2);
        Recipe recipe10 = new Recipe("Chocolate Chip Cookies", "Classic chocolate chip cookies with a soft and chewy texture.", "15 minutes", dessert, user2);
        Recipe recipe11 = new Recipe("Chicken Fajitas", "Sizzling chicken fajitas with peppers and onions.", "30 minutes", dinner, user2);
        Recipe recipe12 = new Recipe("Pancakes with Maple Syrup", "Fluffy pancakes drizzled with sweet maple syrup.", "20 minutes", breakfast, user2);
        Recipe recipe13 = new Recipe("Caprese Salad", "Refreshing salad with tomatoes, mozzarella, basil, and balsamic glaze.", "10 minutes", lunch, user2);
        Recipe recipe14 = new Recipe("Beef and Broccoli Stir-Fry", "Tender beef and broccoli stir-fried in a savory sauce.", "25 minutes", dinner, user2);
        Recipe recipe15 = new Recipe("Creamy Tomato Soup", "Creamy tomato soup with a hint of basil.", "15 minutes", lunch, user2);
        Recipe recipe16 = new Recipe("Lemon Blueberry Muffins", "Moist and tangy lemon blueberry muffins.", "30 minutes", breakfast, user3);
        Recipe recipe17 = new Recipe("Spicy Shrimp Tacos", "Spicy shrimp tacos with avocado and cilantro lime slaw.", "20 minutes", dinner, user2);
        Recipe recipe18 = new Recipe("Greek Salad", "Classic Greek salad with olives, feta cheese, and Greek dressing.", "10 minutes", lunch, user2);
        Recipe recipe19 = new Recipe("Homemade Sushi Rolls", "Delicious homemade sushi rolls with fresh ingredients.", "45 minutes", dinner, user2);
        Recipe recipe20 = new Recipe("Blueberry Pancakes", "Fluffy blueberry pancakes served with butter and syrup.", "15 minutes", breakfast, user3);
        Recipe recipe21 = new Recipe("Chicken Caesar Salad", "Crisp romaine lettuce with grilled chicken and Caesar dressing.", "20 minutes", lunch, user2);
        Recipe recipe22 = new Recipe("Mushroom Risotto", "Creamy mushroom risotto with Arborio rice.", "35 minutes", dinner, user2);
        Recipe recipe23 = new Recipe("Egg and Cheese Breakfast Burrito", "Hearty breakfast burrito filled with eggs, cheese, and salsa.", "15 minutes", breakfast, user2);
        Recipe recipe24 = new Recipe("Homemade Guacamole", "Fresh and flavorful guacamole with ripe avocados and spices.", "10 minutes", lunch, user3);
        Recipe recipe25 = new Recipe("Beef Tacos", "Tasty beef tacos with your favorite toppings.", "25 minutes", dinner, user2);
        Recipe recipe26 = new Recipe("Chocolate Cake", "Rich and indulgent chocolate cake with chocolate frosting.", "40 minutes", dessert, user2);
        Recipe recipe27 = new Recipe("Vegetarian Chili", "Hearty and satisfying vegetarian chili with beans and vegetables.", "30 minutes", dinner, user2);
        Recipe recipe28 = new Recipe("French Toast", "Classic French toast with a sprinkle of powdered sugar.", "15 minutes", breakfast, user3);
        Recipe recipe29 = new Recipe("Caesar Salad", "Classic Caesar salad with croutons and Parmesan cheese.", "10 minutes", lunch, user2);
        Recipe recipe30 = new Recipe("Lemon Garlic Shrimp Pasta", "Lemon garlic shrimp served over a bed of pasta.", "20 minutes", dinner, user2);
        Recipe recipe31 = new Recipe("Blueberry Muffins", "Homemade blueberry muffins bursting with blueberries.", "25 minutes", breakfast, user2);
        Recipe recipe32 = new Recipe("Tomato Basil Bruschetta", "Delicious tomato basil bruschetta on toasted baguette slices.", "15 minutes", lunch, user3);
        Recipe recipe33 = new Recipe("Beef and Vegetable Stir-Fry", "Quick and flavorful beef and vegetable stir-fry.", "30 minutes", dinner, user2);
        Recipe recipe34 = new Recipe("Spinach and Feta Omelette", "Fluffy omelette filled with spinach and feta cheese.", "10 minutes", breakfast, user2);
        Recipe recipe35 = new Recipe("Homemade Pesto Pasta", "Creamy homemade pesto sauce tossed with pasta.", "20 minutes", lunch, user2);
        Recipe recipe36 = new Recipe("Garlic Butter Shrimp", "Garlic butter shrimp cooked to perfection.", "25 minutes", dinner, user3);
        Recipe recipe37 = new Recipe("Pancakes with Berries", "Pancakes topped with fresh berries and whipped cream.", "15 minutes", breakfast, user2);
        Recipe recipe38 = new Recipe("Vegetable Soup", "Comforting vegetable soup with a variety of vegetables.", "30 minutes", lunch, user2);
        Recipe recipe39 = new Recipe("Homemade Meatloaf", "Classic homemade meatloaf with a savory glaze.", "45 minutes", dinner, user2);
        Recipe recipe40 = new Recipe("Cinnamon French Toast", "Cinnamon-spiced French toast served with syrup.", "20 minutes", breakfast, user3);
        Recipe recipe41 = new Recipe("Chicken Quesadillas", "Savory chicken quesadillas with melted cheese.", "25 minutes", dinner, user2);
        Recipe recipe42 = new Recipe("Mango Smoothie", "Refreshing mango smoothie made with ripe mangoes and yogurt.", "10 minutes", breakfast, user2);
        Recipe recipe43 = new Recipe("Tomato Soup", "Homemade tomato soup with a touch of cream.", "15 minutes", lunch, user2);
        Recipe recipe44 = new Recipe("BBQ Pulled Pork Sandwich", "Tender BBQ pulled pork sandwich with coleslaw.", "30 minutes", dinner, user3);
        Recipe recipe45 = new Recipe("Avocado Toast with Poached Egg", "Avocado toast topped with a perfectly poached egg.", "20 minutes", breakfast, user2);
        Recipe recipe46 = new Recipe("Shrimp Scampi", "Garlicky shrimp scampi served over linguine.", "25 minutes", dinner, user2);
        Recipe recipe47 = new Recipe("Mixed Berry Pancakes", "Pancakes loaded with a mix of fresh berries.", "15 minutes", breakfast, user2);
        Recipe recipe48 = new Recipe("Caesar Wrap", "Caesar salad wrapped in a tortilla for a quick lunch.", "10 minutes", lunch, user3);
        Recipe recipe49 = new Recipe("Sesame Chicken", "Crispy sesame chicken with a sweet and savory sauce.", "35 minutes", dinner, user2);
        Recipe recipe50 = new Recipe("Fruit Salad", "Colorful fruit salad with a citrus dressing.", "15 minutes", dessert, user2);


        categoryService.save(breakfast);
        categoryService.save(lunch);
        categoryService.save(dinner);
        categoryService.save(dessert);


        recipeService.saveAll(Arrays.asList(recipe1 ,recipe2 ,recipe3 ,recipe4 ,recipe5 ,recipe6 ,recipe7 ,recipe8 ,recipe9 ,recipe10,recipe11,recipe12,recipe13,recipe14,recipe15,recipe16,recipe17,recipe18,recipe19,recipe20,recipe21,recipe22,recipe23,recipe24,recipe25,recipe26,recipe27,recipe28,recipe29,recipe30,recipe31,recipe32,recipe33,recipe34,recipe35,recipe36,recipe37,recipe38,recipe39,recipe40,recipe41,recipe42,recipe43,recipe44,recipe45,recipe46,recipe47,recipe48,recipe49,recipe50));
//        recipeService.save(recipe2);
//        recipeService.save(recipe3);
//        recipeService.save(recipe4);
//        recipeService.save(recipe5);
    }

}
