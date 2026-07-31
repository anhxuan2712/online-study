package com.dan.repository;

import com.dan.model.Teacher;
import com.dan.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Teacher findByUser(User user);
    @Query("SELECT t FROM Teacher t WHERE CONCAT(t.user.name, ' ', t.discipline) LIKE %:keyword%")
    Page<Teacher> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
