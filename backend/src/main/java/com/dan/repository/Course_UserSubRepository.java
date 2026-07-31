package com.dan.repository;

import com.dan.model.Course_UserSub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Course_UserSubRepository extends JpaRepository<Course_UserSub, Long> {
}
