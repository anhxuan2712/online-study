package com.dan.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
    @OneToOne
    @JoinColumn(name = "lession_video_id")
    private FileUpload lessionVideo;
    @OneToOne
    @JoinColumn(name = "lession_document_id")
    private FileUpload lessionDocument;
    private boolean publicDocument;
}
