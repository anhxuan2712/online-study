package com.dan.model.dto;

import com.dan.model.Answer;
import com.dan.model.Lession;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question_Answer {
    private String questionContent;
    List<Answer> answers;
}
