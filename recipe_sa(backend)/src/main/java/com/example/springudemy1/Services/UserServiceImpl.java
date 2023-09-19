package com.example.springudemy1.Services;

import com.example.springudemy1.Entities.MyRole;
import com.example.springudemy1.Entities.MyUser;
import com.example.springudemy1.Entities.RegistrationDetails;
import com.example.springudemy1.Entities.UserCredentials;
import com.example.springudemy1.Exceptions.AppException;
import com.example.springudemy1.Repositories.RoleRepository;
import com.example.springudemy1.Repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.CharBuffer;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

//    private EmployeeDAO employeeDAO;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;

//    @Autowired
//    public EmployeeServiceImpl (EmployeeDAO theEmployeeDAO){
//        employeeDAO = theEmployeeDAO;
//    }

    @Autowired
    public UserServiceImpl(UserRepository theUserRepo, PasswordEncoder passwEnc, RoleRepository roleRepository){
        userRepository = theUserRepo;
        passwordEncoder = passwEnc;
        this.roleRepository = roleRepository;

    }

    public MyUser login(UserCredentials userCredentials){
        MyUser user = this.findUserByUsername(userCredentials.getUsername());
//        if(passwordEncoder.matches(CharBuffer.wrap(userCredentials.getPassword()), user.getPassword())){
        if(passwordEncoder.matches(userCredentials.getPassword(), user.getPassword())){
            log.info("passwords match each other");
            return user;
        }
        else{
            throw new AppException("Invalid passport", HttpStatus.BAD_REQUEST);
        }
    }

    public MyUser register(RegistrationDetails registrationDetails) {
        MyUser retrievedUser = userRepository.findUserByUsername(registrationDetails.getUsername());
        if (retrievedUser != null){
            throw new AppException("User already exists - UserName: " + registrationDetails.getUsername(), HttpStatus.BAD_REQUEST);
        }
        MyRole userRole = roleRepository.findByRoleName("ROLE_USER");
        MyUser newUser = MyUser.builder()
                .username(registrationDetails.getUsername())
                .email(registrationDetails.getEmail())
                .password(passwordEncoder.encode(CharBuffer.wrap(registrationDetails.getPassword()))) //to not store passwords in plain text,
//                but rather in hashed form (!!!)
                .roles(new HashSet<>(Arrays.asList(userRole)))
                .build();

        MyUser savedUser = userRepository.save(newUser);

        return savedUser;

    }

    @Override
    public List<MyUser> findAll() {
        return userRepository.findAll();
    }

    @Override
    public MyUser findById(int lookUpId) {
        Optional<MyUser> res = userRepository.findById(lookUpId);
        MyUser toReturn = null;
        if (res.isPresent()){
            toReturn = res.get();
        }
        else {
            throw new RuntimeException("User not found - ID: " + lookUpId);
        }
        return toReturn;
    }

    @Transactional
    @Override
    public MyUser save(MyUser theUser) {
        return userRepository.save(theUser);
    }

    @Transactional
    @Override
    public void deleteById(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public MyUser findUserByUsername(String username) {
        MyUser retrievedUser = userRepository.findUserByUsername(username);
        if (retrievedUser != null){
            return retrievedUser;
        }
        else {
            return null;
//            throw new AppException("User not found - UserName: " + username, HttpStatus.NOT_FOUND);
        }
    }


}
