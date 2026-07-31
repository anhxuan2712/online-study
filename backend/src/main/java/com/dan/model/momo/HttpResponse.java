package com.dan.model.momo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import okhttp3.Headers;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HttpResponse {
    int status;
    String data;
    Headers headers;
}
