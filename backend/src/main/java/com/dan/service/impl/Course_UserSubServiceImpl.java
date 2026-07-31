package com.dan.service.impl;

import com.dan.config.CustomEnvironment;
import com.dan.exception.MoMoException;
import com.dan.model.Course;
import com.dan.model.Course_User;
import com.dan.model.Course_UserSub;
import com.dan.model.User;
import com.dan.model.momo.PaymentResponse;
import com.dan.model.momo.RequestType;
import com.dan.repository.Course_UserSubRepository;
import com.dan.service.Course_UserService;
import com.dan.service.Course_UserSubService;
import com.dan.service.UserService;
import com.dan.util.LogUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Service
public class Course_UserSubServiceImpl implements Course_UserSubService {
    @Autowired
    private Course_UserSubRepository course_UserSubRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CreateOrderMoMo createOrderMoMo;

    @Override
    public Course_UserSub createCourse_UserSub(Course_UserSub course_UserSub) {
        return course_UserSubRepository.save(course_UserSub);
    }

    @Override
    @Transactional
    public PaymentResponse createCourse_User(Course course, String username) throws MoMoException {
        User user = userService.getUserByUsername(username);
        LogUtils.init();
        String requestId = String.valueOf(System.currentTimeMillis());
        String orderId = String.valueOf(System.currentTimeMillis());
        Long transId = 2L;
        Course_UserSub course_user = new Course_UserSub();
        course_user.setCourse(course);
        course_user.setUser(user);
        course_user.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        long amount = course_user.getCourse().getCost();

        String partnerClientId = "partnerClientId";
        Course_UserSub newCourse_User = course_UserSubRepository.save(course_user);
        String orderInfo = newCourse_User.getId().toString();
        String returnURL = "http://localhost:8080/success";
        String notifyURL = "https://google.com.vn";
        CustomEnvironment environment = CustomEnvironment.selectEnv("dev");
        PaymentResponse captureWalletMoMoResponse = createOrderMoMo.process(environment, orderId, requestId,
                Long.toString(amount), orderInfo, returnURL, notifyURL, "", RequestType.PAY_WITH_ATM, Boolean.TRUE);
        return captureWalletMoMoResponse;
    }

    @Override
    public Course_UserSub getCourse_UserSub(Long id) {
        return course_UserSubRepository.findById(id).orElseThrow(() -> new RuntimeException("Course_UserSub not found"));
    }

    @Override
    @Transactional
    public void deleteCourse_UserSub(Long id) {
        course_UserSubRepository.deleteById(id);
    }
}
