package com.dan.controller;

import com.dan.model.dto.CommentDto;
import com.dan.service.CommentService;
import com.dan.service.CourseService;
import com.dan.service.JwtService;
import com.dan.service.LessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/createComment")
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto,
                                                            @RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);
        return new ResponseEntity(commentService.createComment(commentDto, username), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentDto> getComment(@PathVariable Long id) {
        return new ResponseEntity(commentService.getCommentParentComment(commentService.getComment(id)), HttpStatus.OK);
    }
}
