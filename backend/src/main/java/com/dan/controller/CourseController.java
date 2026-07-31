package com.dan.controller;

import com.dan.exception.MoMoException;
import com.dan.model.Category;
import com.dan.model.Course;
import com.dan.model.FileUpload;
import com.dan.model.Teacher;
import com.dan.model.dto.CourseDetailAndSuggest;
import com.dan.model.dto.ResponseMessage;
import com.dan.model.momo.PaymentResponse;
import com.dan.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;
    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private Course_UserSubService course_userSubService;

    @GetMapping("")
    public ResponseEntity<Page<Course>> getAllCourses(@RequestParam(value = "keyword", defaultValue = "") String keyword,
                                                      @RequestParam(value = "category", defaultValue = "") String kCategory,
                                                      @RequestParam(value = "page", defaultValue = "0") int page,
                                                      @RequestParam(value = "size", defaultValue = "10") int size,
                                                      @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
                                                      @RequestParam(value = "order", defaultValue = "desc") String order)
    {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc(sortBy)));
        return new  ResponseEntity<>(courseService.getAllCourses(keyword, pageable, kCategory), HttpStatus.OK);
    }

    @PostMapping("/admin/add")
    public ResponseEntity<Course> createCourse(@RequestParam(value = "name") String name,
                                               @RequestParam(value = "description") String description,
                                               @RequestParam(value = "cost") int cost,
                                               @RequestParam(value = "courseImage", required = false) MultipartFile courseImage,
                                               @RequestParam(value = "courseVideo", required = false) MultipartFile courseVideo,
                                               @RequestParam(value = "result") String result,
                                               @RequestParam(value = "object") String object,
                                               @RequestParam(value = "category") Category category,
                                               @RequestParam(value = "teacher")Teacher teacher) throws IOException {

        return new ResponseEntity<>(courseService.createCourse(name, description, cost, courseImage, courseVideo, result, object, category, teacher), HttpStatus.CREATED);
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<Course> updateCourse(@RequestParam(value = "name") String name,
                                               @RequestParam(value = "description") String description,
                                               @RequestParam(value = "cost") int cost,
                                               @RequestParam(value = "courseImage", required = false) MultipartFile courseImage,
                                               @RequestParam(value = "courseVideo", required = false) MultipartFile courseVideo,
                                               @RequestParam(value = "result") String result,
                                               @RequestParam(value = "object") String object,
                                               @RequestParam(value = "category") Category category,
                                               @RequestParam(value = "teacher") Teacher teacher,
                                               @PathVariable("id") Long id) throws IOException {
        return new ResponseEntity<>(courseService.updateCourse(name, description, cost, courseImage, courseVideo, result, object, category, teacher, id), HttpStatus.OK);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<ResponseMessage> deleteCourse(@PathVariable("id") Long id) throws IOException {
        courseService.deleteCourse(id);
        return new ResponseEntity<>(new ResponseMessage("deleted"), HttpStatus.OK);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Course> getCourseById(@PathVariable("id") Long id) {
//        return new ResponseEntity<>(courseService.getCourseById(id), HttpStatus.OK);
//    }
    @GetMapping("/{id}")
    public ResponseEntity<CourseDetailAndSuggest> showCourseDetail(@PathVariable("id") Long id) {
        return new ResponseEntity<>(courseService.getCourseDetailAndSuggest(id), HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<PaymentResponse> createCourse_User(@RequestHeader("Authorization") String token,
                                                             @PathVariable("id") Long id) throws MoMoException {
        token = token.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);
        Course course = courseService.getCourseById(id);
        return new ResponseEntity<>(course_userSubService.createCourse_User(course, username), HttpStatus.CREATED);
    }

    @GetMapping("/course/by-category/{id}")
    public ResponseEntity<Page<Course>> getCourseByCategory(@PathVariable("id") Long id,
                                                           @RequestParam(value = "page", defaultValue = "0") int page,
                                                           @RequestParam(value = "size", defaultValue = "10") int size,
                                                           @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
                                                           @RequestParam(value = "order", defaultValue = "desc") String order) {
        Category category = categoryService.getCategoryById(id);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc(sortBy)));
        return new ResponseEntity<>(courseService.getCourseByCategory(category, pageable), HttpStatus.OK);
    }
}
