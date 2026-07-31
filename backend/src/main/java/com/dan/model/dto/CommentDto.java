package com.dan.model.dto;

import com.dan.model.Comment;
import com.dan.model.Course;
import com.dan.model.Lession;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    @Lob
    private String content;
    private Course course;
    private Lession lession;
    private Comment parentComment;
}
