package com.dan.service;

import com.dan.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    Page<Category> getAllCategories(String keyword, Pageable pageable);
    Category getCategoryById(Long id);
    Category createCategory(Category category);
    Category updateCategory(Category category, Long id);
    void deleteCategory(Long id);
}
