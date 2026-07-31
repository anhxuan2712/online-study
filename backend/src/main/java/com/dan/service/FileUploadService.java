package com.dan.service;

import com.dan.model.FileUpload;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileUploadService {
    FileUpload uploadFile(String fileName, MultipartFile multipartFile) throws IOException;
    Resource getFileAsResource(String fileCode) throws IOException;
    void deleteFile(Long id) throws IOException;
}
