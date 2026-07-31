package com.dan.controller;

import com.dan.model.Banner;
import com.dan.model.dto.ResponseMessage;
import com.dan.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/banner")
public class BannerController {
    @Autowired
    private BannerService bannerService;

    @GetMapping("")
    public ResponseEntity<Page<Banner>> getAllBanners(@RequestParam(value = "page", defaultValue = "0") int page,
                                                      @RequestParam(value = "size", defaultValue = "10") int size,
                                                      @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
                                                      @RequestParam(value = "order", defaultValue = "desc") String order) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc(sortBy)));
        return new ResponseEntity(bannerService.getAllBanners(pageable), HttpStatus.OK);
    }

    @PostMapping("/admin/add")
    public ResponseEntity<Banner> createBanner(@RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        return new ResponseEntity(bannerService.createBanner(image), HttpStatus.CREATED);
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<Banner> updateBanner(@RequestParam(value = "image") MultipartFile image, @PathVariable Long id) throws IOException {
        return new ResponseEntity(bannerService.updateBanner(image, id), HttpStatus.OK);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteBanner(@PathVariable Long id) {
        bannerService.deleteBanner(id);
        return new ResponseEntity(new ResponseMessage("deleted"), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Banner> getBanner(@PathVariable Long id) {
        return new ResponseEntity(bannerService.getBanner(id), HttpStatus.OK);
    }
}
