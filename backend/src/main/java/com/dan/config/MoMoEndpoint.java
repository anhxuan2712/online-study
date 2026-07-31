package com.dan.config;

import org.springframework.context.annotation.Configuration;

public class MoMoEndpoint {
    private String endpoint;
    private String create;

    public MoMoEndpoint(String endpoint, String create) {
        this.endpoint = endpoint;
        this.create = create;

    }
    public String getCreateUrl() {
        return endpoint + create;
    }
}
