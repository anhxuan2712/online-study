package com.dan.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private int cost;

    @OneToOne
    @JoinColumn(name = "course_image_id")
    private FileUpload courseImage;

    @OneToOne
    @JoinColumn(name = "course_video_id")
    private FileUpload courseVideo;

    @Column(columnDefinition = "TEXT")
    private String result;
    @Column(columnDefinition = "TEXT")
    private String object;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
}
