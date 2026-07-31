package com.dan.repository;

import com.dan.model.MomoPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MomoPaymentRepository extends JpaRepository<MomoPayment, Long> {
}
