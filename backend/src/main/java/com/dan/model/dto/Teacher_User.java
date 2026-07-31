package com.dan.model.dto;

import com.dan.model.Teacher;
import com.dan.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher_User {
    private Teacher teacher;
    private User user;
}
