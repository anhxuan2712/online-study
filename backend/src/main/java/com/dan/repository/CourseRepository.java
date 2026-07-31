package com.dan.repository;

import com.dan.model.Category;
import com.dan.model.Course;
import com.dan.model.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query("SELECT c FROM Course c WHERE CONCAT(c.name, ' ', c.object) LIKE %:keyword% AND c.category.name LIKE %:kCategory%" )
    Page<Course> searchByKeyword(String keyword, Pageable pageable, String kCategory);
    Page<Course> findByCategory(Category category, Pageable pageable);
    List<Course> findByCategoryOrTeacherAndIdNot(Category category, Teacher teacher, Pageable pageable, Long id);
    @Query("SELECT SUM(c.cost) FROM Course c WHERE c.id = ?1")
    int getTotalCost(Long id);
    List<Course> findByTeacher(Teacher teacher);
}
