package com.dan.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Pattern(regexp = "\\d{12}", message = "CCCD phải bao gồm 12 chữ số")
    private String cccd;
    private boolean sex;
    private String discipline;
    private String level;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "image_id")
    private FileUpload image;
    @Column(columnDefinition = "TEXT")
    private String story;
    @Column(columnDefinition = "TEXT")
    private String achievements;
    @Column(columnDefinition = "TEXT")
    private String styleTeaching;
}
