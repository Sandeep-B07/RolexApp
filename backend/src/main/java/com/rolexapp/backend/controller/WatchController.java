package com.rolexapp.backend.controller;

import com.rolexapp.backend.dto.WatchSearch;
import com.rolexapp.backend.model.Watch;
import com.rolexapp.backend.service.WatchService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watches")
@RequiredArgsConstructor
public class WatchController {

    private final WatchService watchService;

    @GetMapping
    public List<Watch> getAll(WatchSearch search) {
        return watchService.findAll(search);
    }

    @GetMapping("/featured")
    public List<Watch> getFeatured() {
        return watchService.findFeatured();
    }

    @GetMapping("/collections")
    public List<String> getCollections() {
        return watchService.findCollections();
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return watchService.findCategories();
    }

    @GetMapping("/{id}")
    public Watch getById(@PathVariable Long id) {
        return watchService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Watch> create(@Valid @RequestBody Watch watch) {
        Watch saved = watchService.create(watch);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public Watch update(@PathVariable Long id, @Valid @RequestBody Watch watch) {
        return watchService.update(id, watch);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        watchService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
