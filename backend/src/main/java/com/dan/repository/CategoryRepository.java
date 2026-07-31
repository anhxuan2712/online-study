package com.dan.repository;

import com.dan.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
//    @Query("SELECT c FROM Category c WHERE c.name LIKE %?1% OR c.description LIKE %?1%")
    @Query("SELECT c FROM Category c WHERE CONCAT(c.name, ' ', c.description) LIKE %:keyword%" )
    Page<Category> searchByKeyword(String keyword, Pageable pageable);
}
