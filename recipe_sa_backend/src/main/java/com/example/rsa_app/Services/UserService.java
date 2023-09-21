package com.example.rsa_app.Services;

import com.example.rsa_app.Entities.MyUser;
import com.example.rsa_app.Entities.RegistrationDetails;
import com.example.rsa_app.Entities.UserCredentials;

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
