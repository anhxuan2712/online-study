package com.dan.model;

import com.dan.model.dto.Course_Amount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    private Teacher teacher;
    private List<Course_Amount> course_amounts;
    private int totalCourse;
}
