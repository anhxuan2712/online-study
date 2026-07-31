package com.dan.service.impl;

import com.dan.model.Banner;
import com.dan.model.FileUpload;
import com.dan.repository.BannerRepository;
import com.dan.service.BannerService;
import com.dan.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class BannerServiceImpl implements BannerService {
    @Autowired
    private BannerRepository bannerRepository;
    @Autowired
    private FileUploadService fileUploadService;

    @Override
    public Banner createBanner(Banner banner) {
        return null;
    }

    @Override
    @Transactional
    public Banner createBanner(MultipartFile file) throws IOException {
        Banner b = new Banner();
        if (file != null && !file.isEmpty()) {
            String fileBannerImageName = StringUtils.cleanPath(file.getOriginalFilename());
            FileUpload fileUploadBannerImage = fileUploadService.uploadFile(fileBannerImageName, file);
            b.setImage(fileUploadBannerImage);
        }
        return bannerRepository.save(b);
    }

    @Override
    @Transactional
    public void deleteBanner(Long id) {
        bannerRepository.deleteById(id);
    }

    @Override
    public Banner getBanner(Long id) {
        return bannerRepository.findById(id).orElseThrow(() -> new RuntimeException("Banner not found"));
    }

    @Override
    @Transactional
    public Banner updateBanner(Banner banner, Long id) {
        return null;
    }

    @Override
    public Banner updateBanner(MultipartFile file, Long id) throws IOException {
        Banner banner = getBanner(id);
        Long oldBannerImageId = null;
        if (file != null && !file.isEmpty()) {
            if (banner.getImage() != null && !banner.getImage().equals("")) {
                oldBannerImageId = banner.getImage().getId();
            }
            String fileBannerImageName = StringUtils.cleanPath(file.getOriginalFilename());
            FileUpload fileUploadBannerImage = fileUploadService.uploadFile(fileBannerImageName, file);
            banner.setImage(fileUploadBannerImage);
        }
        Banner updateBanner = bannerRepository.save(banner);
        if (oldBannerImageId != null) {
            fileUploadService.deleteFile(oldBannerImageId);
        }
        return updateBanner;
    }

    @Override
    public Page<Banner> getAllBanners(Pageable pageable) {
        return bannerRepository.findAll(pageable);
    }
}
