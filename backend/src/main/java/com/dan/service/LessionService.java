package com.dan.service;

import com.dan.model.Course;
import com.dan.model.Lession;
import com.dan.model.dto.LessionDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LessionService {
    public Page<Lession> getAllLessions(String keyword, Pageable pageable);
    public Lession createLession(Course course, String name, String description, MultipartFile lessionVideo, MultipartFile lessionDocument, boolean publicDocument) throws Exception;
    public Lession updateLession(Long id, Course course, String name, String description, MultipartFile lessionVideo, MultipartFile lessionDocument, boolean publicDocument) throws Exception;
    public Lession getLession(Long id);
    public Page<Lession> getLessionsPublic(Pageable pageable);
    public LessionDetail getLessionDetail(Long id);
    public void deleteLession(Long id);
    public List<Lession> getLessionsByCourse(Course course);
}
