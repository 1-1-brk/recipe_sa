package com.example.springudemy1.Services;

import com.example.springudemy1.Entities.MyUser;
import com.example.springudemy1.Entities.RegistrationDetails;
import com.example.springudemy1.Entities.UserCredentials;

import java.util.List;

public interface UserService {

    List<MyUser> findAll();

    MyUser findById(int lookUpId);

    MyUser save(MyUser theUser);

    void deleteById(int id);

    MyUser findUserByUsername(String username);

    MyUser login(UserCredentials userCredentials);

    MyUser register(RegistrationDetails registrationDetails);
}
