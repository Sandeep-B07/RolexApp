package com.rolexapp.backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class WatchSearch {
    private String collection;
    private String category;
    private String search;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private String sort;
}
