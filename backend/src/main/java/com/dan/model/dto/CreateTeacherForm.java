package com.dan.model.dto;

import com.dan.model.Discipline;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTeacherForm {
    private String name;
    private String username;
    private String password;
    private String email;
    private Date dob;
    private String phoneNumber;

    private String cccd;
    private boolean sex;
    private String discipline;
    private String level;
}
