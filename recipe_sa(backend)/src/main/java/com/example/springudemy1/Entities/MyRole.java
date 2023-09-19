package com.example.springudemy1.Entities;


import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class MyRole{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String roleName;

    public MyRole() {
    }

    public MyRole(String roleName) {
        this.roleName = roleName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String toString() {
        return "MyRole{" +
                "id=" + id +
                ", roleName='" + roleName + '\'' +
                '}';
    }
}


//public enum MyRole {
//    ROLE_GUEST("ROLE_GUEST"),
//    ROLE_USER("ROLE_USER"),
//    ROLE_ADMIN("ROLE_ADMIN");
//
//    private final String role;
//
//    MyRole(String role) {
//        this.role = role;
//    }
//}
