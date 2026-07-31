package com.dan.service.impl;

import com.dan.model.Comment;
import com.dan.model.Course;
import com.dan.model.Lession;
import com.dan.model.User;
import com.dan.model.dto.CommentDto;
import com.dan.repository.CommentRepository;
import com.dan.service.CommentService;
import com.dan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserService userService;

//    @Override
//    public Comment createCommentToCourse(CommentDto commentDto, String username) {
//        User user = userService.getUserByUsername(username);
//        Comment comment = new Comment();
//        comment.setContent(commentDto.getContent());
//        comment.setUser(user);
//        comment.setCourse(commentDto.getCourse());
//        return commentRepository.save(comment);
//    }

//    @Override
//    public Comment createCommentToComment(CommentDto commentDto, String username) {
//        User user = userService.getUserByUsername(username);
//        Comment comment = new Comment();
//        comment.setContent(commentDto.getContent());
//        comment.setUser(user);
//        comment.setParentComment(commentDto.getParentComment());
//        return commentRepository.save(comment);
//    }
//
//    @Override
//    public Comment createCommentToLession(CommentDto commentDto, String username) {
//        User user = userService.getUserByUsername(username);
//        Comment comment = new Comment();
//        comment.setContent(commentDto.getContent());
//        comment.setLession(commentDto.getLession());
//        return commentRepository.save(comment);
//    }

    @Override
    @Transactional
    public Comment createComment(CommentDto commentDto, String username) {
        User user = userService.getUserByUsername(username);
        Comment comment = new Comment();
        comment.setContent(commentDto.getContent());
        comment.setParentComment(commentDto.getParentComment());
        comment.setCourse(commentDto.getCourse());
        comment.setLession(commentDto.getLession());
        comment.setUser(user);
        return commentRepository.save(comment);
    }

    @Override
    @Transactional
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public List<Comment> getCommentByCourse(Course course) {
        return commentRepository.findByCourse(course);
    }

    @Override
    public List<Comment> getCommentLession(Lession lession) {
        return commentRepository.findByLession(lession);
    }

    @Override
    public List<Comment> getCommentParentComment(Comment parentComment) {
        return commentRepository.findByParentComment(parentComment);
    }

    @Override
    public Comment getComment(Long id) {
        return commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
    }
}
