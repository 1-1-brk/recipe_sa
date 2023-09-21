package com.example.rsa_app.Controllers;


import com.example.rsa_app.Configs.UserAuthProvider;
import com.example.rsa_app.DTOs.UserDTO;
import com.example.rsa_app.Entities.MyUser;
import com.example.rsa_app.Entities.RegistrationDetails;
import com.example.rsa_app.Entities.UserCredentials;
import com.example.rsa_app.Services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;


@Slf4j
@RestController
public class AuthController<T> {

    private final UserService userService;
    private final UserAuthProvider userAuthProvider;
    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Autowired
    public AuthController(UserService userService,
                          UserAuthProvider userAuthProvider) {
        this.userService = userService;
        this.userAuthProvider = userAuthProvider;
    }

    @PostMapping("/x-login")
    public ResponseEntity<UserDTO> login(@RequestBody UserCredentials userCredentials){
        log.info("got a login request");
        try {
            MyUser user = userService.login(userCredentials);
            UserDTO userDto = UserDTO.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .token(user.getToken())
                    .build();
            userDto.setToken(userAuthProvider.createToken(user.getUsername()));
            log.info(userDto.toString());
//            return (ResponseEntity<T>) ResponseEntity.status(HttpStatus.OK).body(user);
            return ResponseEntity.ok().body(userDto);

        } catch (Exception e){
            log.info(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
//    public ResponseEntity<MyUser> login(@RequestBody RegistrationDetails registrationDetails){
    public ResponseEntity<UserDTO> login(@RequestBody RegistrationDetails registrationDetails){
        try {
            MyUser newUser = userService.register(registrationDetails);
            UserDTO userDto = UserDTO.builder()
                    .id(newUser.getId())
                    .username(newUser.getUsername())
                    .token(newUser.getToken())
                    .build();
            userDto.setToken(userAuthProvider.createToken(newUser.getUsername()));
            return ResponseEntity.created(URI.create("/users/" + userDto.getId())).body(userDto);
//            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }


//        return ResponseEntity.created(URI.create("/users/" + newUser.getId()));
//                .body(newUser);
    }



}
