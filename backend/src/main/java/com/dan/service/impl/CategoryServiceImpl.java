package com.dan.service.impl;

import com.dan.model.Category;
import com.dan.repository.CategoryRepository;
import com.dan.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Page<Category> getAllCategories(String keyword, Pageable pageable) {
        return categoryRepository.searchByKeyword(keyword, pageable);
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category, Long id) {
        return categoryRepository.findById(id).map(c -> {
            c.setName(category.getName());
            c.setDescription(category.getDescription());
            return categoryRepository.save(c);
        }).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
