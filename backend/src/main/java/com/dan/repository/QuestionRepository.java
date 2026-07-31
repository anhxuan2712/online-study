package com.dan.repository;

import com.dan.model.Lession;
import com.dan.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long>{
    Page<Question> findByLession(Lession lession, Pageable pageable);
}
