package com.dan.model.dto;

import com.dan.model.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment_PComment {
    private Comment parentComment;
    private List<Comment> childComments;
}
