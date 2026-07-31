package com.dan.service;

import com.dan.model.Lession;
import com.dan.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QuestionService {
    public Question createQuestion(Question question);
    public Question updateQuestion(Question question, Long id);
    public void deleteQuestion(Long id);
    public Question getQuestion(Long id);
    public Page<Question> getQuestionsByLession(Lession lession, Pageable pageable);
}
