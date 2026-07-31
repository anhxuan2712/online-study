package com.dan.model.dto;

import com.dan.model.Course;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course_Amount {
    Course course;
    int totalAmount;
}
