package com.dan.repository;

import com.dan.model.Comment;
import com.dan.model.Course;
import com.dan.model.Lession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByCourse(Course course);
    List<Comment> findByLession(Lession lession);
    List<Comment> findByParentComment(Comment parentComment);
}
