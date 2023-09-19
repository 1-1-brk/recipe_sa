package com.example.springudemy1.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.DialectOverride;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Builder
@Entity
@AllArgsConstructor
@Data
@Table(name = "users")
public class MyUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "user_id")
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "profile_picture", nullable = true)
    private String profile_picture;

    @Column(name = "enabled")
    private boolean enabled;

//    @Column(name = "token")
    private String token;


//    @ManyToMany(fetch = FetchType.EAGER)
//    @OneToMany
//    @JoinTable(
//            name = "user_roles",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "role_id"))
//    private Collection<Role> roles;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
//    private MyRole role;
    private Set<MyRole> roles;


//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY )
//    private Set<Recipe> recipes = new HashSet<>();




    public MyUser() {
    }

    public MyUser(String username, String password, String email, String profile_picture, Set<MyRole> roles) {
//        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.profile_picture = profile_picture;
        this.roles = roles;
    }




}
