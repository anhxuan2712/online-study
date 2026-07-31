package com.dan.service.impl;

import com.dan.model.FileUpload;
import com.dan.repository.FileUploadRepository;
import com.dan.service.FileUploadService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileUploadServiceImpl implements FileUploadService {
    @Autowired
    private FileUploadRepository fileUploadRepository;
    private Path foundFile;

    @Override
    public FileUpload uploadFile(String fileName, MultipartFile multipartFile) throws IOException {
        Path uploadDirectory = Paths.get("Files-Upload");
        String fileCode = RandomStringUtils.randomAlphanumeric(8);
        try (InputStream inputStream = multipartFile.getInputStream()){
            Path filePath = uploadDirectory.resolve(fileCode + "-" + fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }catch (IOException e){
            throw new IOException("Error saving file: " + fileName, e);
        }
        FileUpload fileUpload = new FileUpload();

        // Extract file extension
        String originalFileName = multipartFile.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

        fileUpload.setFileType(fileExtension);
        fileUpload.setFileCode(fileCode);
        fileUpload.setSize(multipartFile.getSize());
        return fileUploadRepository.save(fileUpload);
    }

    @Override
    public Resource getFileAsResource(String fileCode) throws IOException {
        Path uploadDirectory = Paths.get("Files-Upload");
        Files.list(uploadDirectory).forEach((file -> {
            if (file.getFileName().toString().startsWith(fileCode)){
                foundFile = file;
                return;
            }
        }));
        if (foundFile != null){
            return new UrlResource(foundFile.toUri());
        }
        return null;
    }

    @Override
    public void deleteFile(Long id) throws IOException {
        fileUploadRepository.deleteById(id);
    }

//    public String getContentType(String fileCode) {
//        FileEntity fileEntity = fileRepository.findByFileCode(fileCode);
//
//        if (fileEntity == null) {
//            return null;
//        }
//
//        return fileEntity.getContentType();
//    }
}
