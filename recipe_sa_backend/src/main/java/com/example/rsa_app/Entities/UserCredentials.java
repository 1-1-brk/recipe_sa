package com.example.rsa_app.Entities;

public class UserCredentials {
    private String username;
    private String password;

    public UserCredentials() {
    }

    public UserCredentials(String login, String password) {
        this.username = login;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
