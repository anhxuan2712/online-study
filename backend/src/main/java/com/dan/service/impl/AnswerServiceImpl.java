package com.dan.service.impl;

import com.dan.model.Answer;
import com.dan.model.Question;
import com.dan.repository.AnswerRepository;
import com.dan.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AnswerServiceImpl implements AnswerService {
    @Autowired
    private AnswerRepository answerRepository;

    @Override
    @Transactional
    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    @Override
    @Transactional
    public Answer updateAnswer(Answer answer, Long id) {
        return answerRepository.findById(id).map(answer1 -> {
            answer1.setContent(answer.getContent());
            answer1.setCorrect(answer.isCorrect());
            answer1.setQuestion(answer.getQuestion());
            return answerRepository.save(answer1);
        }).orElseThrow(() -> new RuntimeException("Answer not found with id " + id));
    }

    @Override
    @Transactional
    public void deleteAnswer(Long id) {
        answerRepository.deleteById(id);
    }

    @Override
    public Answer getAnswer(Long id) {
        return answerRepository.findById(id).orElseThrow(() -> new RuntimeException("Answer not found with id " + id));
    }

    @Override
    public List<Answer> getAnswersByQuestion(Question question) {
        return answerRepository.findByQuestion(question);
    }
}
