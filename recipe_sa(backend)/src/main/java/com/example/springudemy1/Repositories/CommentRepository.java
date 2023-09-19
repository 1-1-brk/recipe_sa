package com.example.springudemy1.Repositories;

import com.example.springudemy1.Entities.Comment;
import com.example.springudemy1.Entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
