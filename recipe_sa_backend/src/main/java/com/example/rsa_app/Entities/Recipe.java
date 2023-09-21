package com.example.rsa_app.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Table(name = "recipes")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "recipe_id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "instructions")
    private String instructions;

    @Column(name = "cook_time")
    private String cook_time;

    @ManyToOne
    @JoinColumn(name = "category_id")
//    @Column(name = "category_id")
//    private int category_id;
    private Category category;

    @CreationTimestamp
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    @UpdateTimestamp
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;

//    @Column(name = "user_id", nullable = false)
//    private int user_id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private MyUser user;



//    public Recipe() {
//    }

    public Recipe(String name, String instructions, String cook_time, Category category, MyUser user) {
//        this.id = id;
        this.name = name;
        this.instructions = instructions;
        this.cook_time = cook_time;
        this.category = category;
//        this.created_at = created_at;
//        this.updated_at = updated_at;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getCook_time() {
        return cook_time;
    }

    public void setCook_time(String cook_time) {
        this.cook_time = cook_time;
    }

//    public int getCategory_id() {
//        return category_id;
//    }

//    public void setCategory_id(int category_id) {
//        this.category_id = category_id;
//    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }

    public MyUser getUser() {
        return user;
    }

    public void setUser(MyUser user) {
        this.user = user;
    }


    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", instructions='" + instructions + '\'' +
                ", cook_time='" + cook_time + '\'' +
//                ", category_id=" + category_id +
                ", created_at=" + created_at +
                ", updated_at=" + updated_at +
                ", user_id=" + user.getId() +
                '}';
    }
}
