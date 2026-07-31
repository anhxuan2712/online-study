package com.dan.service;

import com.dan.model.Banner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface BannerService {
    Banner createBanner(Banner banner);
    Banner createBanner(MultipartFile file) throws IOException;
    void deleteBanner(Long id);
    Banner getBanner(Long id);
    Banner updateBanner(Banner banner, Long id);
    Banner updateBanner(MultipartFile file, Long id) throws IOException;
    Page<Banner> getAllBanners(Pageable pageable);
}
