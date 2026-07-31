package com.dan.controller;

import com.dan.model.Course;
import com.dan.model.Report;
import com.dan.model.Teacher;
import com.dan.model.dto.CreateTeacherForm;
import com.dan.model.dto.ResponseMessage;
import com.dan.model.dto.Teacher_User;
import com.dan.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/teachers")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;


    @GetMapping("")
    public ResponseEntity<Page<Teacher>> getAllTeachers(@RequestParam(value = "keyword", defaultValue = "") String keyword,
                                                        @RequestParam(value = "page", defaultValue = "0") int page,
                                                        @RequestParam(value = "size", defaultValue = "10") int size,
                                                        @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
                                                        @RequestParam(value = "order", defaultValue = "desc") String order) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc(sortBy)));
        return new ResponseEntity(teacherService.getAllTeacherByKeyword(keyword, pageable), HttpStatus.OK);
    }

    @PostMapping("/admin/add")
    public ResponseEntity<Teacher> createTeacher(@RequestParam(value = "name") String name,
                                                 @RequestParam(value = "username") String username,
                                                 @RequestParam(value = "password") String password,
                                                 @RequestParam(value = "email") String email,
                                                 @RequestParam(value = "dob") Date dob,
                                                 @RequestParam(value = "phoneNumber") String phoneNumber,
                                                 @RequestParam(value = "cccd") String cccd,
                                                 @RequestParam(value = "sex") boolean sex,
                                                 @RequestParam(value = "discipline") String discipline,
                                                 @RequestParam(value = "level") String level,
                                                 @RequestParam(value = "file", required = false)MultipartFile file,
                                                 @RequestParam(value = "story") String story,
                                                 @RequestParam(value = "achievements") String achievements,
                                                 @RequestParam(value = "styleTeaching") String styleTeaching) throws IOException {
        return new ResponseEntity(teacherService.createTeacher(name, username, password, email, dob, phoneNumber, cccd, sex, discipline, level, file, story, achievements, styleTeaching), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teacher_User> getTeacher(@PathVariable(value = "id") Long id) {
        return new ResponseEntity(teacherService.getTeacherUser(id), HttpStatus.OK);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<ResponseMessage> deleteTeacher(@PathVariable(value = "id") Long id) {
        teacherService.deleteTeacher(id);
        return new ResponseEntity(new ResponseMessage("deleted"), HttpStatus.OK);
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<Teacher> updateTeacher(@PathVariable(value = "id") Long id,
                                                 @RequestParam(value = "name") String name,
                                                 @RequestParam(value = "dob") Date dob,
                                                 @RequestParam(value = "phoneNumber") String phoneNumber,
                                                 @RequestParam(value = "cccd") String cccd,
                                                 @RequestParam(value = "sex") boolean sex,
                                                 @RequestParam(value = "discipline") String discipline,
                                                 @RequestParam(value = "level") String level,
                                                 @RequestParam(value = "file", required = false) MultipartFile file,
                                                 @RequestParam(value = "story") String story,
                                                 @RequestParam(value = "achievements") String achievements,
                                                 @RequestParam(value = "styleTeaching") String styleTeaching) throws IOException {
        return new ResponseEntity(teacherService.updateTeacher(name, dob, phoneNumber, cccd, sex, discipline, level, file, story, achievements, styleTeaching, id), HttpStatus.OK);
    }

    @GetMapping("/report")
    ResponseEntity<Report> getReport(@RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);
        Teacher teacher = teacherService.getTeacherByUser(userService.getUserByUsername(username));
        return new ResponseEntity(teacherService.getReport(teacher), HttpStatus.OK);
    }
}
