package com.example.springudemy1.Services;

import com.example.springudemy1.Entities.Comment;
import com.example.springudemy1.Entities.Recipe;

import java.util.List;

public interface CommentService {

    List<Comment> findAll();

    Comment findById(int lookUpId);

    Comment save(Comment theEmp);

    void deleteById(int id);

}
