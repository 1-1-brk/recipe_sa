package com.example.rsa_app.Configs;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final PasswordEncoder passwordEncoder;
    private final UserAuthenticationEntryPoint userAuthencticationEntryPoint;
    private final UserAuthProvider userAuthProvider;

    @Autowired
    public SecurityConfig(PasswordEncoder passwordEncoder,
                          UserAuthenticationEntryPoint userAuthencticationEntryPoint,
                          UserAuthProvider userAuthProvider) {
        this.passwordEncoder = passwordEncoder;
        this.userAuthencticationEntryPoint = userAuthencticationEntryPoint;
        this.userAuthProvider = userAuthProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity)throws Exception{
        httpSecurity
                .exceptionHandling(customizer -> customizer.authenticationEntryPoint(userAuthencticationEntryPoint)) // custom exception Handler -> для custom exception message для аутентификации
                .addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)
                .csrf(customizer -> customizer.disable()) //to avoid complexity
                .sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // stateless Application =>
//                no cookie or session will be created by spring
                .authorizeHttpRequests(
                (requests)-> requests
                        .requestMatchers("/adminPage").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "*/getAll").permitAll()
                        .requestMatchers(HttpMethod.POST, "/x-login", "/register").permitAll()

                        .anyRequest().authenticated()


//                        .requestMatchers("/MyProfile", "/newRecipe", "/updateRecipe", "/{recId}")
//                        .hasAnyRole("USER", "ADMIN")
//                        .requestMatchers("/adminPage")
        );
        httpSecurity.httpBasic(Customizer.withDefaults());
        return httpSecurity.build();
    }

}
