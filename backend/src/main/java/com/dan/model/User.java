package com.dan.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false, unique = true)
    @Size(min = 6)
    private String username;

    @Column(nullable = false)
    @Size(min = 6)
    private String password;

    @Column(nullable = false, unique = true)
    @Email
    private String email;

    @OneToOne
    @JoinColumn(name = "avatar_id", referencedColumnName = "id")
    private FileUpload avatar;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    Set<Role> roles = new HashSet<>();

    private Date dob;
    @Pattern(regexp = "(\\d{4}[-.]?\\d{3}[-.]?\\d{3})", message = "Số điện thoại phải bao gồm 10 chữ số và có thể có dấu chấm hoặc dấu gạch ngang giữa các phần tử")
    private String phoneNumber;

    public User(String name, String username, String encode, String email) {
        this.name = name;
        this.username = username;
        this.password = encode;
        this.email = email;
    }
}
