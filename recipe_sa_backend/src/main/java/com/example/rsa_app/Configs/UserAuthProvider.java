package com.example.rsa_app.Configs;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.rsa_app.Entities.MyUser;
import com.example.rsa_app.Services.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
//import com.auth0.*;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;


@RequiredArgsConstructor
@Component
public class UserAuthProvider {

    private UserService userService;

//                                                l  l  l  l  l  l  l
//                                                v  v  v  v  v  v  v
    @Value("${security.jwt.token.secret-key:this-is-the-secret-value}")
//   либо присвоить значение в application.yaml/ -.properties файле
    private String secretKey;

    @Autowired
    public UserAuthProvider(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    protected void init(){
//        to avoid having a key in plain text in JVM
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String login){
        Date now = new Date();
        Date validTill = new Date(now.getTime() + 3600000); //valid for one hour
        return JWT.create()

                .withIssuer(login)
                .withIssuedAt(now)
                .withExpiresAt(validTill)
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey))
                .build();
        DecodedJWT decodedJWT = verifier.verify(token);
        MyUser user = userService.findUserByUsername(decodedJWT.getIssuer());

        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }
}
