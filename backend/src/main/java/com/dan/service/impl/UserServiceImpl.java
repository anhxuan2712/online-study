package com.dan.service.impl;

import com.dan.model.FileUpload;
import com.dan.model.Role;
import com.dan.model.User;
import com.dan.model.dto.ChangePasswordForm;
import com.dan.model.dto.ResponseMessage;
import com.dan.repository.RoleRepository;
import com.dan.repository.UserRepository;
import com.dan.service.FileUploadService;
import com.dan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User updateUser(User user, Long id) {
        return userRepository.findById(id)
                .map(u -> {
                    u.setName(user.getName());
                    u.setEmail(user.getEmail());
                    u.setAvatar(user.getAvatar());
                    return userRepository.save(u);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    @Transactional
    public User updateUser(String name, Date dob, String phoneNumber,
                           MultipartFile avatar, String username) {
        User currentUser = userRepository.findByUsername(username);
        currentUser.setName(name);
        currentUser.setDob(dob);
        currentUser.setPhoneNumber(phoneNumber);
        Long oldAvatarId = null;
        if (avatar != null && !avatar.isEmpty()) {
            String avatarName = StringUtils.cleanPath(avatar.getOriginalFilename());
            if (currentUser.getAvatar() != null && !currentUser.getAvatar().equals("")) {
                oldAvatarId = currentUser.getAvatar().getId();
            }
            try {
                FileUpload fileUploadAvatar = fileUploadService.uploadFile(avatarName, avatar);
                currentUser.setAvatar(fileUploadAvatar);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        User updateCurrentUser = userRepository.save(currentUser);
        if (oldAvatarId != null) {
            try {
                fileUploadService.deleteFile(oldAvatarId);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return updateCurrentUser;
    }

    @Override
    @Transactional
    public ResponseMessage changePassword(String username, ChangePasswordForm changePasswordForm) {
        User currentUser = userRepository.findByUsername(username);
        ResponseMessage responseMessage = new ResponseMessage();
        if(passwordEncoder.matches(changePasswordForm.getOldPassword(), currentUser.getPassword())){
            if(!changePasswordForm.getNewPassword().equals(changePasswordForm.getConfirmPassword())){
                responseMessage.setMessage("password_not_match");
            }
            currentUser.setPassword(passwordEncoder.encode(changePasswordForm.getNewPassword()));
            userRepository.save(currentUser);
            responseMessage.setMessage("change_password_success");
        }
        else {
            responseMessage.setMessage("change_password_fail");
        }
        return responseMessage;
    }

    @Override
    public Page<User> getUserByKeyWord(String keyword, Pageable pageable) {
        return userRepository.searchByKeyword(keyword, pageable);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        org.springframework.security.core.userdetails.User us = new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), rolesToAuthorities(user.getRoles()));
        return us;
    }

    private Collection<? extends GrantedAuthority> rolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(role ->new  SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());
    }
}
