package com.example.rsa_app.Repositories;

import com.example.rsa_app.Entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
