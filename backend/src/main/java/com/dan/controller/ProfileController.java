package com.dan.controller;

import com.dan.model.User;
import com.dan.model.dto.ChangePasswordForm;
import com.dan.model.dto.ResponseMessage;
import com.dan.service.JwtService;
import com.dan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

    @GetMapping("")
    public ResponseEntity<User> getCustomer(@RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);
        User user = userService.getUserByUsername(username);
        return new  ResponseEntity(user, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateProfile(@RequestHeader("Authorization") String token,
                                              @RequestParam(value = "name") String name,
                                              @RequestParam(value = "dob") Date dob,
                                              @RequestParam(value = "phoneNumber") String phoneNumber,
                                              @RequestParam(value = "avatar", required = false) MultipartFile avatar) {
        String username = getCustomer(token).getBody().getUsername();
        return new ResponseEntity(userService.updateUser(name, dob, phoneNumber, avatar, username), HttpStatus.OK);
    }

    @PutMapping("/change-password")
    public ResponseEntity<ResponseMessage> changePassword(@RequestHeader("Authorization") String token,
                                                          @RequestBody ChangePasswordForm changePasswordForm) {
        String username = getCustomer(token).getBody().getUsername();
        return new ResponseEntity(userService.changePassword(username, changePasswordForm), HttpStatus.OK);
    }
}
