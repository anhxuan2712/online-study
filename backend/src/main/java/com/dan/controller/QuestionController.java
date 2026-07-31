package com.dan.controller;

import com.dan.model.Lession;
import com.dan.model.Question;
import com.dan.model.dto.CreateQuestionForm;
import com.dan.model.dto.Question_Answer;
import com.dan.service.AnswerService;
import com.dan.service.QuestionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @Autowired
    private AnswerService answerService;

    @PostMapping("/create-question")
    public ResponseEntity<CreateQuestionForm> createQuestion(@RequestParam("createQuestionForm")String createQuestionForm){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            CreateQuestionForm createQuestionForm1 = objectMapper.readValue(createQuestionForm, CreateQuestionForm.class);
            Lession lession = createQuestionForm1.getLession();
            List<Question_Answer> question_answers = createQuestionForm1.getQuestion_answers();
            question_answers.forEach(question_answer -> {
                Question question = new Question();
                question.setLession(lession);
                question.setContent(question_answer.getQuestionContent());
                questionService.createQuestion(question);

                question_answer.getAnswers().forEach(answer -> {
                    answer.setQuestion(question);
                    answerService.createAnswer(answer);
                });
            });
            return ResponseEntity.ok(createQuestionForm1);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
