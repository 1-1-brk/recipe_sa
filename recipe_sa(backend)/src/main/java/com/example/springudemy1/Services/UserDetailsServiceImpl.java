package com.example.springudemy1.Services;

import com.example.springudemy1.Entities.MyUser;
import com.example.springudemy1.Entities.MyUserDetails;
import com.example.springudemy1.Repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//@Service
public class UserDetailsServiceImpl { //implements UserDetailsService {

//    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
//    private static final Marker WARNING_MARKER = MarkerFactory.getMarker("WARNING");
//
//    private UserRepository userRepository;
//
//    public UserDetailsServiceImpl() {
//    }
//
//    @Autowired
//    public UserDetailsServiceImpl(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//        MyUser user = userRepository.findUserByUsername(username);
//
//        if (user == null) {
//            logger.warn(WARNING_MARKER, "Could not find user by username");
//            throw new UsernameNotFoundException("Could not find user by username");
//        }
//
////        ПРЕДЛОЖЕНИЕ ОТ БОТА
////        // Create and return a UserDetails instance using the user data
////        return org.springframework.security.core.userdetails.User.builder()
////                .username(user.getUsername())
////                .password(user.getPassword()) // Assuming password is already encoded
////                .authorities(user.getRoles())
////                .build();
//
//        return new MyUserDetails(user);
//    }
}
