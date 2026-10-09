package com.rolexapp.backend.service;

import com.rolexapp.backend.dto.WatchSearch;
import com.rolexapp.backend.model.Watch;
import com.rolexapp.backend.repository.WatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Predicate;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WatchService {

    private final WatchRepository watchRepository;

    public List<Watch> findAll(WatchSearch search) {
        Specification<Watch> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(search.getCollection())) {
                predicates.add(cb.equal(cb.lower(root.get("collection")),
                        search.getCollection().trim().toLowerCase()));
            }
            if (StringUtils.hasText(search.getCategory())) {
                predicates.add(cb.equal(cb.lower(root.get("category")),
                        search.getCategory().trim().toLowerCase()));
            }
            if (StringUtils.hasText(search.getSearch())) {
                String like = "%" + search.getSearch().trim().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("collection")), like),
                        cb.like(cb.lower(root.get("referenceNumber")), like),
                        cb.like(cb.lower(root.get("dialColor")), like)
                ));
            }
            if (search.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), search.getMinPrice()));
            }
            if (search.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), search.getMaxPrice()));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Sort sort = resolveSort(search.getSort());
        return watchRepository.findAll(spec, sort);
    }

    public List<Watch> findFeatured() {
        return watchRepository.findByFeaturedTrue();
    }

    public List<String> findCollections() {
        return watchRepository.findAllCollections();
    }

    public List<String> findCategories() {
        return watchRepository.findAllCategories();
    }

    public Watch findById(Long id) {
        return watchRepository.findById(id)
                .orElseThrow(() -> new WatchNotFoundException("Watch not found with id: " + id));
    }

    @Transactional
    public Watch create(Watch watch) {
        return watchRepository.save(watch);
    }

    @Transactional
    public Watch update(Long id, Watch updated) {
        Watch existing = findById(id);
        existing.setName(updated.getName());
        existing.setReferenceNumber(updated.getReferenceNumber());
        existing.setCollection(updated.getCollection());
        existing.setCategory(updated.getCategory());
        existing.setCaseMaterial(updated.getCaseMaterial());
        existing.setCaseSize(updated.getCaseSize());
        existing.setDialColor(updated.getDialColor());
        existing.setBracelet(updated.getBracelet());
        existing.setMovement(updated.getMovement());
        existing.setPowerReserve(updated.getPowerReserve());
        existing.setWaterResistance(updated.getWaterResistance());
        existing.setPrice(updated.getPrice());
        existing.setStock(updated.getStock());
        existing.setImageUrl(updated.getImageUrl());
        existing.setDescription(updated.getDescription());
        existing.setFeatured(updated.isFeatured());
        return watchRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        if (!watchRepository.existsById(id)) {
            throw new WatchNotFoundException("Watch not found with id: " + id);
        }
        watchRepository.deleteById(id);
    }

    private Sort resolveSort(String sort) {
        if (!StringUtils.hasText(sort)) {
            return Sort.by(Sort.Direction.ASC, "collection", "name");
        }
        String key = sort.toLowerCase();
        if ("price-asc".equals(key)) {
            return Sort.by(Sort.Direction.ASC, "price");
        }
        if ("price-desc".equals(key)) {
            return Sort.by(Sort.Direction.DESC, "price");
        }
        if ("name".equals(key)) {
            return Sort.by(Sort.Direction.ASC, "name");
        }
        if ("newest".equals(key)) {
            return Sort.by(Sort.Direction.DESC, "id");
        }
        return Sort.by(Sort.Direction.ASC, "collection", "name");
    }
}
