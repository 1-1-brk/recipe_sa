package com.example.rsa_app.Services;

import com.example.rsa_app.Entities.Comment;

import java.util.List;

public interface CommentService {

    List<Comment> findAll();

    Comment findById(int lookUpId);

    Comment save(Comment theEmp);

    void deleteById(int id);

}
