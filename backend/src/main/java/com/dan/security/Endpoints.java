package com.dan.security;

public class Endpoints {
    public static final String front_end_host = "http://localhost:3000";
    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/courses/**",
            "/comments/**",
    };

    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/login",
            "/signup",
            "/comments/**",
    };

    public static final String[] PUBLIC_PUT_ENDPOINTS = {
            "/profile/**",
            "/comments/**",
    };

    public static final String[] PUBLIC_DELETE_ENDPOINTS = {
    };

    public static final String[] TEACHER_GET_ENDPOINTS = {
            "/report/**",
    };

    public static final String[] ADMIN_GET_ENDPOINTS = {
            "/admin/**",
            "/teacher/**"
    };

    public static final String[] ADMIN_POST_ENDPOINTS = {
            "/admin/**",
            "/teacher/**"
    };

    public static final String[] ADMIN_PUT_ENDPOINTS = {
            "/admin/**",
            "/teacher/**"
    };

    public static final String[] ADMIN_DELETE_ENDPOINTS = {
            "/admin/**",
            "/teacher/**"
    };
}
