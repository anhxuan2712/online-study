package com.dan.service;

import com.dan.model.User;
import com.dan.model.dto.ChangePasswordForm;
import com.dan.model.dto.ResponseMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

public interface UserService extends UserDetailsService {
    public User getUserByUsername(String username);
    public User createUser(User user);
    public boolean existsByUsername(String username);
    public boolean existsByEmail(String email);
    public User updateUser(User user, Long id);
    public User updateUser(String name, Date dob, String phoneNumber,
                           MultipartFile file, String username);
    public ResponseMessage changePassword(String username, ChangePasswordForm changePasswordForm);
    public Page<User> getUserByKeyWord(String keyword, Pageable pageable);
    public void deleteUser(Long id);
}
