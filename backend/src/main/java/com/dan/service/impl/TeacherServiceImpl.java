package com.dan.service.impl;

import com.dan.model.*;
import com.dan.model.dto.Course_Amount;
import com.dan.model.dto.CreateTeacherForm;
import com.dan.model.dto.Teacher_User;
import com.dan.repository.TeacherRepository;
import com.dan.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class TeacherServiceImpl implements TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private Course_UserService course_userService;
    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleService roleService;

    @Override
    public Teacher createTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @Override
    @Transactional
    public Teacher createTeacher(CreateTeacherForm createTeacherForm) {
        User user = new User();
        Teacher teacher = new Teacher();
        user.setName(createTeacherForm.getName());
        user.setUsername(createTeacherForm.getUsername());
        user.setPassword(passwordEncoder.encode(createTeacherForm.getPassword()));
        user.setEmail(createTeacherForm.getEmail());
        user.setPhoneNumber(createTeacherForm.getPhoneNumber());

        teacher.setUser(userService.createUser(user));
        teacher.setCccd(createTeacherForm.getCccd());
        teacher.setSex(createTeacherForm.isSex());
        teacher.setDiscipline(createTeacherForm.getDiscipline());
        teacher.setLevel(createTeacherForm.getLevel());
        return teacherRepository.save(teacher);
    }

    @Override
    @Transactional
    public Teacher createTeacher(String name, String username, String password, String email, Date dob,
                                 String phoneNumber, String cccd, boolean sex, String discipline, String level, MultipartFile file, String story, String achievements, String styleTeaching) throws IOException {
        Teacher teacher = new Teacher();
        User user = new User();
        user.setName(name);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setDob(dob);
        user.setPhoneNumber(phoneNumber);

        Set<Role> roles = new HashSet<>();
        Role teacherRole = roleService.findByName(RoleName.TEACHER).orElseThrow(() -> new RuntimeException("Role not found"));
        roles.add(teacherRole);
        user.setRoles(roles);

        User newUser = userService.createUser(user);
        teacher.setUser(newUser);
        teacher.setCccd(cccd);
        teacher.setSex(sex);
        teacher.setDiscipline(discipline);
        teacher.setLevel(level);
        teacher.setStory(story);
        teacher.setAchievements(achievements);
        teacher.setStyleTeaching(styleTeaching);
        if (file != null && !file.isEmpty()){
            String imageName = StringUtils.cleanPath(file.getOriginalFilename());
            FileUpload fileUploadTeacherImage = fileUploadService.uploadFile(imageName, file);
            teacher.setImage(fileUploadTeacherImage);
        }
        return teacherRepository.save(teacher);
    }

    @Override
    public List<Teacher> getAllTeacher() {
        return teacherRepository.findAll();
    }

    @Override
    public Teacher getTeacher(Long id) {
        return teacherRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found teacher"));
    }

    @Override
    @Transactional
    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }

    @Override
    public Teacher updateTeacher(Teacher teacher, Long id) {
        return teacherRepository.findById(id).map(teacher1 -> {
            teacher1.setCccd(teacher.getCccd());
            teacher1.setSex(teacher.isSex());
            teacher1.setDiscipline(teacher.getDiscipline());
            teacher1.setLevel(teacher.getLevel());
            return teacherRepository.save(teacher1);
        }).orElseThrow(() -> new RuntimeException("Not found teacher"));
    }

    @Override
    @Transactional
    public Teacher updateTeacher(CreateTeacherForm createTeacherForm, Long id) {
        Teacher teacher = teacherRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found teacher"));
        User user = teacher.getUser();
        user.setName(createTeacherForm.getName());
        user.setPhoneNumber(createTeacherForm.getPhoneNumber());
        userService.updateUser(user, user.getId());

        teacher.setCccd(createTeacherForm.getCccd());
        teacher.setSex(createTeacherForm.isSex());
        teacher.setDiscipline(createTeacherForm.getDiscipline());
        teacher.setLevel(createTeacherForm.getLevel());
        teacherRepository.save(teacher);
        return teacher;
    }

    @Override
    public Teacher updateTeacher(String name, Date dob, String phoneNumber, String cccd, boolean sex, String discipline, String level,
                                 MultipartFile file, String story, String achievements, String styleTeaching, Long id) throws IOException {
        Teacher teacher = teacherRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found teacher"));
        User user = teacher.getUser();
        user.setName(name);
        user.setDob(dob);
        user.setPhoneNumber(phoneNumber);
        User updateUser = userService.updateUser(user, user.getId());
        teacher.setCccd(cccd);
        teacher.setDiscipline(discipline);
        teacher.setLevel(level);
        teacher.setStory(story);
        teacher.setAchievements(achievements);
        teacher.setStyleTeaching(styleTeaching);
        Long oldImageId = null;

        if (file != null && !file.isEmpty()) {
            if (teacher.getImage() != null && !teacher.getImage().equals("")){
                oldImageId = teacher.getImage().getId();
            }
            String fileTeacherImageName = StringUtils.cleanPath(file.getOriginalFilename());
            FileUpload fileUploadTeacherImage = null;
            try {
                fileUploadTeacherImage = fileUploadService.uploadFile(fileTeacherImageName, file);
                teacher.setImage(fileUploadTeacherImage);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        Teacher updateTeacher = teacherRepository.save(teacher);
        if (oldImageId != null){
            try {
                fileUploadService.deleteFile(oldImageId);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return updateTeacher;
    }

    @Override
    public Teacher getTeacherByUser(User user) {
        return teacherRepository.findByUser(user);
    }

    @Override
    public Teacher_User getTeacherUser(Long id) {
        Teacher teacher = teacherRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found teacher"));
        User user = teacher.getUser();
        Teacher_User teacher_user = new Teacher_User();
        teacher_user.setTeacher(teacher);
        teacher_user.setUser(user);
        return teacher_user;
    }

    @Override
    public Page<Teacher> getAllTeacherByKeyword(String keyword, Pageable pageable) {
        return teacherRepository.searchByKeyword(keyword, pageable);
    }

    @Override
    public Report getReport(Teacher teacher) {
        Report report = new Report();
        report.setTeacher(teacher);
        List<Course> courses = courseService.getCourseByTeacher(teacher);
        List<Course_Amount> courseAmounts = new ArrayList<>();
        List<Course_User> course_users = new ArrayList<>();
        for (Course course : courses) {
            int totalAmount = course_userService.totalCostOfCourse(course);
            Course_Amount course_amount = new Course_Amount();
            course_amount.setCourse(course);
            course_amount.setTotalAmount(totalAmount);
            courseAmounts.add(course_amount);
            List<Course_User> course_users1 = course_userService.getCourse_UserByCourse(course);
            course_users.addAll(course_users1);
        }
        report.setCourse_amounts(courseAmounts);
        report.setTotalCourse(course_users.size());
        return report;
    }
}
