package com.dan.service;

import com.dan.config.CustomEnvironment;
import com.dan.config.PartnerInfo;
import com.dan.util.Execute;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public abstract class AbstractProcess<T, V> {
    protected static PartnerInfo partnerInfo;
    protected CustomEnvironment environment;
    protected Execute execute = new Execute();

    public AbstractProcess(CustomEnvironment environment) {
        this.environment = environment;
        this.partnerInfo = environment.getPartnerInfo();
    }

    public static Gson getGson() {
        return new GsonBuilder()
                .disableHtmlEscaping()
                .create();
    }

    public abstract V execute(T request) throws RuntimeException;
}
