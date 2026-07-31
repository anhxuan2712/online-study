package com.dan.controller;

import com.dan.model.MomoPayment;
import com.dan.security.Endpoints;
import com.dan.service.Course_UserService;
import com.dan.service.Course_UserSubService;
import com.dan.service.MomoPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@Transactional
public class MomoPaymentController {
    @Autowired
    private MomoPaymentService momoPaymentService;
    @Autowired
    private Course_UserService course_userService;
    @Autowired
    private Course_UserSubService course_userSubService;

    @GetMapping("/success")
    public String handleMomoCallback(
            @RequestParam String partnerCode,
            @RequestParam String orderId,
            @RequestParam String requestId,
            @RequestParam String amount,
            @RequestParam String orderInfo,
            @RequestParam String orderType,
            @RequestParam String transId,
            @RequestParam String resultCode,
            @RequestParam String message,
            @RequestParam String payType,
            @RequestParam String responseTime,
            @RequestParam String extraData,
            @RequestParam String signature,
            Model model) {

        MomoPayment payment = new MomoPayment();
        payment.setPartnerCode(partnerCode);
        payment.setOrderId(orderId);
        payment.setRequestId(requestId);
        payment.setAmount(amount);
        payment.setOrderInfo(orderInfo);
        payment.setOrderType(orderType);
        payment.setTransId(transId);
        payment.setResultCode(resultCode);
        payment.setMessage(message);
        payment.setPayType(payType);
        payment.setResponseTime(responseTime);
        payment.setExtraData(extraData);
        payment.setSignature(signature);

        model.addAttribute("orderId", orderInfo);
        model.addAttribute("totalPrice", amount);
        model.addAttribute("paymentTime", responseTime);
        model.addAttribute("transactionId", transId);
        String homeUrl = Endpoints.front_end_host;
        model.addAttribute("homeUrl", homeUrl);

        MomoPayment momoPayment = momoPaymentService.createMomoPayment(payment);
        if (momoPayment != null) {
            Long courseId = Long.parseLong(orderInfo);
            course_userService.createCourse_UserBySub(course_userSubService.getCourse_UserSub(courseId));
            course_userSubService.deleteCourse_UserSub(courseId);
            return "ordersuccess";
        }else {
            return "orderfail";
        }
    }
}
