package com.dan.model.dto;

import com.dan.model.Lession;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateQuestionForm {
    private Lession lession;
    private List<Question_Answer> question_answers;
}
