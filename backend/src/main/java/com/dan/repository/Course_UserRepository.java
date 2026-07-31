package com.dan.repository;

import com.dan.model.Course;
import com.dan.model.Course_User;
import com.dan.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Course_UserRepository extends JpaRepository<Course_User, Long>{
    @Query("SELECT c FROM Course_User c WHERE c.user = ?1 AND c.course.name LIKE %?2%")
    Page<Course_User> findByUserAndNameContain(User user, String name, Pageable pageable);
    @Query("SELECT c FROM Course_User c WHERE CONCAT(c.course.name, ' ', c.user.name) LIKE %:keyword%" )
    Page<Course_User> findByKeyword(String keyword, Pageable pageable);

    @Query("SELECT SUM(c.course.cost) FROM Course_User c WHERE c.course = ?1")
    int totalCostOfCourse(Course course);

    List<Course_User> findByCourse(Course course);
}
