package com.dan.repository;

import com.dan.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    User findByUsername(String username);

    @Query("SELECT u FROM User u WHERE CONCAT(u.name, ' ', u.username, ' ', u.email) LIKE %:keyword%" )
    Page<User> searchByKeyword(String keyword, Pageable pageable);
}
