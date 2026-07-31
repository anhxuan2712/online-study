package com.dan.service.impl;

import com.dan.model.Lession;
import com.dan.model.Question;
import com.dan.repository.QuestionRepository;
import com.dan.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    @Override
    @Transactional
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    @Transactional
    public Question updateQuestion(Question question, Long id) {
        return questionRepository.findById(id).map(question1 -> {
            question1.setContent(question.getContent());
            question1.setLession(question.getLession());
            return questionRepository.save(question1);
        }).orElseThrow(() -> new RuntimeException("Question not found with id " + id));
    }

    @Override
    @Transactional
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    @Override
    public Question getQuestion(Long id) {
        return questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found with id " + id));
    }

    @Override
    public Page<Question> getQuestionsByLession(Lession lession, Pageable pageable) {
        return questionRepository.findByLession(lession, pageable);
    }
}
