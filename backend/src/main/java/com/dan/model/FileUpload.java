package com.dan.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileUpload {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileType;
    private String fileCode;
    private Long size;

    @ManyToOne
    @JoinColumn(name = "lession_id")
    private Lession lession;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
}
