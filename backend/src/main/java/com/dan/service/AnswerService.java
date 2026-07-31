package com.dan.service;

import com.dan.model.Answer;
import com.dan.model.Question;

import java.util.List;

public interface AnswerService {
    public Answer createAnswer(Answer answer);
    public Answer updateAnswer(Answer answer, Long id);
    public void deleteAnswer(Long id);
    public Answer getAnswer(Long id);
    public List<Answer> getAnswersByQuestion(Question question);
}
