package com.dan.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupForm {
    private String name;

    private String username;

    private String password;

    private String email;

    private Set<String> roles;
}
