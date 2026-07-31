package com.dan.service;

import com.dan.model.Category;
import com.dan.model.Course;
import com.dan.model.Report;
import com.dan.model.Teacher;
import com.dan.model.dto.CourseDetailAndSuggest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CourseService {
    public Page<Course> getAllCourses(String keyword, Pageable pageable, String kCategory);
    List<Course> getAllCourses();
    List<Course> getCourseByTeacher(Teacher teacher);
    public Course getCourseById(Long id);
    public CourseDetailAndSuggest getCourseDetailAndSuggest(Long id);
    public Course createCourse(Course course);
    public Course createCourse(String name, String description, int cost, MultipartFile courseImage,
                             MultipartFile courseVideo, String result, String object, Category category, Teacher teacher) throws IOException;
    public void deleteCourse(Long id);
    public Course updateCourse(Long id, Course course);
    public Course updateCourse(String name, String description, int cost, MultipartFile courseImage,
                               MultipartFile courseVideo, String result, String object, Category category, Teacher teacher, Long id) throws IOException;
    Page<Course> getCourseByCategory(Category category, Pageable pageable);}
