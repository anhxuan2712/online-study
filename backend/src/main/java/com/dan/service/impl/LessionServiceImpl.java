package com.dan.service.impl;

import com.dan.model.Comment;
import com.dan.model.Course;
import com.dan.model.FileUpload;
import com.dan.model.Lession;
import com.dan.model.dto.Comment_PComment;
import com.dan.model.dto.LessionDetail;
import com.dan.repository.LessionRepository;
import com.dan.service.CommentService;
import com.dan.service.FileUploadService;
import com.dan.service.LessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class LessionServiceImpl implements LessionService {
    @Autowired
    private LessionRepository lessionRepository;
    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private CommentService commentService;

    @Override
    public Page<Lession> getAllLessions(String keyword, Pageable pageable) {
        return lessionRepository.searchByKeyword(keyword, pageable);
    }

    @Override
    @Transactional
    public Lession createLession(Course course, String name, String description, MultipartFile lessionVideo,
                                 MultipartFile lessionDocument, boolean publicDocument) throws IOException {
        Lession lession = new Lession();
        lession.setName(name);
        lession.setDescription(description);
        lession.setCourse(course);
        lession.setPublicDocument(publicDocument);
        if (lessionVideo != null && !lessionVideo.isEmpty()) {
            String fileLessionVideoName = StringUtils.cleanPath(lessionVideo.getOriginalFilename());
            FileUpload fileUploadLessionVideo = fileUploadService.uploadFile(fileLessionVideoName, lessionVideo);
            lession.setLessionVideo(fileUploadLessionVideo);
        }
        if (lessionDocument != null && !lessionDocument.isEmpty()) {
            String fileLessionDocumentName = StringUtils.cleanPath(lessionDocument.getOriginalFilename());
            FileUpload fileUploadLessionDocument = fileUploadService.uploadFile(fileLessionDocumentName, lessionDocument);
            lession.setLessionDocument(fileUploadLessionDocument);
        }
        return lessionRepository.save(lession);
    }

    @Override
    @Transactional
    public Lession updateLession(Long id, Course course, String name, String description, MultipartFile lessionVideo,
                                 MultipartFile lessionDocument, boolean publicDocument) throws IOException {
        return lessionRepository.findById(id).map(l -> {
            l.setCourse(course);
            l.setName(name);
            l.setDescription(description);
            l.setPublicDocument(publicDocument);
            Long oldLessionVideoId = null;
            Long oldLessionDocumentId = null;
            if (lessionVideo != null && !lessionVideo.isEmpty()) {
                if (l.getLessionVideo() != null && !l.getLessionVideo().equals("")) {
                    oldLessionVideoId = l.getLessionVideo().getId();
                }
                try {
                    String fileLessionVideoName = StringUtils.cleanPath(lessionVideo.getOriginalFilename());
                    FileUpload fileUploadLessionVideo = fileUploadLessionVideo = fileUploadService.uploadFile(fileLessionVideoName, lessionVideo);
                    l.setLessionVideo(fileUploadLessionVideo);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if (lessionDocument != null && !lessionDocument.isEmpty()) {
                if (l.getLessionDocument() != null && !l.getLessionDocument().equals("")) {
                    oldLessionDocumentId = l.getLessionDocument().getId();
                }
                try {
                    String fileLessionDocumentName = StringUtils.cleanPath(lessionDocument.getOriginalFilename());
                    FileUpload fileUploadLessionDocument = fileUploadService.uploadFile(fileLessionDocumentName, lessionDocument);
                    l.setLessionDocument(fileUploadLessionDocument);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            return lessionRepository.save(l);
        }).orElseThrow(() -> new RuntimeException("Not found lession"));
    }

    @Override
    public Lession getLession(Long id) {
        return lessionRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found lession"));
    }

    @Override
    public Page<Lession> getLessionsPublic(Pageable pageable) {
        return lessionRepository.findByPublicDocument(true, pageable);
    }

    @Override
    public LessionDetail getLessionDetail(Long id) {
        Lession lession = lessionRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found lession"));
        List<Comment> pComments = commentService.getCommentLession(lession);
        List<Comment_PComment> comment_pComments = new ArrayList<>();
        for (Comment pComment : pComments) {
            Comment_PComment comment_pComment = new Comment_PComment();
            comment_pComment.setParentComment(pComment);
            List<Comment> childComments = commentService.getCommentParentComment(pComment);
            comment_pComment.setChildComments(childComments);
            comment_pComments.add(comment_pComment);
        }

        LessionDetail lessionDetail = new LessionDetail();
        lessionDetail.setLession(lession);
        lessionDetail.setCommentPComments(comment_pComments);
        return lessionDetail;
    }

    @Override
    @Transactional
    public void deleteLession(Long id) {
        lessionRepository.deleteById(id);
    }

    @Override
    public List<Lession> getLessionsByCourse(Course course) {
        return lessionRepository.findByCourse(course);
    }
}
