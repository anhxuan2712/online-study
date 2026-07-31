package com.dan.service.impl;

import com.dan.model.MomoPayment;
import com.dan.repository.MomoPaymentRepository;
import com.dan.service.MomoPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MomoPaymentServiceImpl implements MomoPaymentService {
    @Autowired
    private MomoPaymentRepository momoPaymentRepository;

    @Override
    public MomoPayment createMomoPayment(MomoPayment momoPayment) {
        return momoPaymentRepository.save(momoPayment);
    }
}
