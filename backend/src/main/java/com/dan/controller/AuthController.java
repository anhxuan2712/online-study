package com.dan.controller;

import com.dan.model.Role;
import com.dan.model.RoleName;
import com.dan.model.User;
import com.dan.model.dto.LoginForm;
import com.dan.model.dto.ResponseMessage;
import com.dan.model.dto.SignupForm;
import com.dan.security.jwt.JwtResponse;
import com.dan.service.JwtService;
import com.dan.service.RoleService;
import com.dan.service.UserService;
import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody SignupForm signupForm) {
        if(userService.existsByUsername(signupForm.getUsername())){
            return new ResponseEntity<>(new ResponseMessage("username_exists"), HttpStatus.BAD_REQUEST);
        }
        if(userService.existsByEmail(signupForm.getEmail())){
            return new ResponseEntity<>(new ResponseMessage("email_exists"), HttpStatus.BAD_REQUEST);
        }

        User user = new User(signupForm.getName(), signupForm.getUsername(), passwordEncoder.encode(signupForm.getPassword()), signupForm.getEmail());
        Set<String> strRoles = signupForm.getRoles();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null){
            Role studentRole = roleService.findByName(RoleName.STUDENT).orElseThrow(() -> new RuntimeException("Role not found"));
            roles.add(studentRole);
        }else {
            strRoles.forEach(role -> {
                switch (role){
                    case "admin":
                        Role adminRole = roleService.findByName(RoleName.ADMIN).orElseThrow(() -> new RuntimeException("Role not found"));
                        roles.add(adminRole);
                        break;
                    case "teacher":
                        Role teacherRole = roleService.findByName(RoleName.TEACHER).orElseThrow(() -> new RuntimeException("Role not found"));
                        roles.add(teacherRole);
                        break;
                    case "student":
                        Role studentRole = roleService.findByName(RoleName.STUDENT).orElseThrow(() -> new RuntimeException("Role not found"));
                        roles.add(studentRole);
                        break;
                }
            });
        }
        user.setRoles(roles);
        userService.createUser(user);
        return new ResponseEntity<>(new ResponseMessage("create_success"), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginForm loginForm) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword()));
            if (authentication.isAuthenticated()) {
                final String jwt = jwtService.generateToken(loginForm.getUsername());
                return new ResponseEntity<>(new JwtResponse(jwt), HttpStatus.OK);
            }
        }catch (AuthenticationException e){
            if (userService.getUserByUsername(loginForm.getUsername()) != null) {
                return new ResponseEntity<>(new ResponseMessage("wrong_password"), HttpStatus.BAD_REQUEST);
            }else {
                return new ResponseEntity<>(new ResponseMessage("username_not_exists"), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(new ResponseMessage("An unknown error"), HttpStatus.BAD_REQUEST);
    }
}
