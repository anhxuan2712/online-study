package com.dan.service;

import com.dan.exception.MoMoException;
import com.dan.model.Course;
import com.dan.model.Course_UserSub;
import com.dan.model.momo.PaymentResponse;

public interface Course_UserSubService {
    public Course_UserSub createCourse_UserSub(Course_UserSub course_UserSub);
    public PaymentResponse createCourse_User(Course course, String username) throws MoMoException;
    public Course_UserSub getCourse_UserSub(Long id);
    public void deleteCourse_UserSub(Long id);
}
