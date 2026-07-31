package com.dan.service;

import com.dan.model.Report;
import com.dan.model.Teacher;
import com.dan.model.User;
import com.dan.model.dto.CreateTeacherForm;
import com.dan.model.dto.Teacher_User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

public interface TeacherService {
    Teacher createTeacher(Teacher teacher);
    Teacher createTeacher(CreateTeacherForm createTeacherForm);
    Teacher createTeacher(String name, String username, String password, String email, Date dob, String phoneNumber, String cccd,
                          boolean sex, String discipline, String level, MultipartFile file, String story, String achievements, String styleTeaching) throws IOException;
    List<Teacher> getAllTeacher();
    Teacher getTeacher(Long id);
    void deleteTeacher(Long id);
    Teacher updateTeacher(Teacher teacher, Long id);
    Teacher updateTeacher(CreateTeacherForm createTeacherForm, Long id);
    Teacher updateTeacher(String name, Date dob, String phoneNumber, String cccd, boolean sex,
                          String discipline, String level, MultipartFile file, String story, String achievements, String styleTeaching, Long id) throws IOException;
    Teacher getTeacherByUser(User user);
    Teacher_User getTeacherUser(Long id);
    Page<Teacher> getAllTeacherByKeyword(String keyword, Pageable pageable);
    Report getReport(Teacher teacher);
}
