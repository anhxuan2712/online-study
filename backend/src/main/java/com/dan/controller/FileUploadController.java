package com.dan.controller;

import com.dan.model.dto.FileUploadResponse;
import com.dan.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class FileUploadController {
    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponse> uploadFile(@RequestParam("file")MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Long size = file.getSize();
        String fileCode = fileUploadService.uploadFile(fileName, file).getFileCode();
        FileUploadResponse fileUploadResponse = new FileUploadResponse();
        fileUploadResponse.setFileName(fileName);
        fileUploadResponse.setSize(size);
        fileUploadResponse.setDownloadUri("/downloadFile/" + fileCode);
        return new ResponseEntity<>(fileUploadResponse, org.springframework.http.HttpStatus.OK);
    }

    @GetMapping("/downloadFile/{fileCode}")
    public ResponseEntity<?> downloadFile(@PathVariable("fileCode") String fileCode) throws IOException {
        Resource resource = null;
        try {
            resource = fileUploadService.getFileAsResource(fileCode);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }

        if (resource == null){
            return ResponseEntity.notFound().build();
        }

        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }

    @GetMapping("/preview/{fileCode}")
    public ResponseEntity<?> previewImage(@PathVariable("fileCode") String fileCode) throws IOException {
        Resource resource = null;
        String contentType = null;
        try {
            resource = fileUploadService.getFileAsResource(fileCode);
            contentType = fileUploadService.getFileAsResource(fileCode).getURL().openConnection().getContentType();
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }

        if (resource == null){
            return ResponseEntity.notFound().build();
        }

        byte[] imageData = StreamUtils.copyToByteArray(resource.getInputStream());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(imageData);
    }
}
