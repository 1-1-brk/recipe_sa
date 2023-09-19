package com.example.springudemy1.Services;

import com.example.springudemy1.Entities.Comment;
import com.example.springudemy1.Entities.Recipe;
import com.example.springudemy1.Repositories.CommentRepository;
import com.example.springudemy1.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

//    private EmployeeDAO employeeDAO;
    private CommentRepository commentRepository;

//    @Autowired
//    public EmployeeServiceImpl (EmployeeDAO theEmployeeDAO){
//        employeeDAO = theEmployeeDAO;
//    }

    @Autowired
    public CommentServiceImpl(CommentRepository theCommentRepo){
        commentRepository = theCommentRepo;
    }

    @Override
    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    @Override
    public Comment findById(int lookUpId) {
        Optional<Comment> res = commentRepository.findById(lookUpId);
        Comment toReturn = null;
        if (res.isPresent()){
            toReturn = res.get();
        }
        else {
            throw new RuntimeException("Comment not found - " + lookUpId);
        }
        return toReturn;
    }

    @Transactional
    @Override
    public Comment save(Comment theComment) {
        return commentRepository.save(theComment);
    }

    @Transactional
    @Override
    public void deleteById(int id) {
        commentRepository.deleteById(id);
    }
}
