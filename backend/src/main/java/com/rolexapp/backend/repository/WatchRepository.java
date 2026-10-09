package com.rolexapp.backend.repository;

import com.rolexapp.backend.model.Watch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WatchRepository extends JpaRepository<Watch, Long>, JpaSpecificationExecutor<Watch> {

    List<Watch> findByFeaturedTrue();

    @Query("SELECT DISTINCT w.collection FROM Watch w ORDER BY w.collection")
    List<String> findAllCollections();

    @Query("SELECT DISTINCT w.category FROM Watch w ORDER BY w.category")
    List<String> findAllCategories();
}
