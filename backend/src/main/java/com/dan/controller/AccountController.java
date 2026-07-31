package com.dan.controller;

import com.dan.model.User;
import com.dan.model.dto.ResponseMessage;
import com.dan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    @Autowired
    private UserService userService;

    @PostMapping("/admin/create-account")
    public ResponseEntity<User> createAccount(@RequestBody User user) {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/admin/get-account")
    public ResponseEntity<Page<User>> getAccountByKeyword(@RequestParam(value = "keyword", defaultValue = "") String keyword,
                                                    @RequestParam(value = "page", defaultValue = "0") int page,
                                                    @RequestParam(value = "size", defaultValue = "10") int size,
                                                    @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
                                                    @RequestParam(value = "order", defaultValue = "desc") String order){
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc(sortBy)));
        return new ResponseEntity<>(userService.getUserByKeyWord(keyword, pageable), HttpStatus.OK);
    }

    @DeleteMapping("/admin/delete-account/{id}")
    public ResponseEntity<ResponseMessage> deleteAccount(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(new ResponseMessage("deleted"), HttpStatus.OK);
    }
}
