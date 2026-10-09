package com.rolexapp.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "watches")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Watch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Watch name is required")
    private String name;

    @NotBlank(message = "Reference number is required")
    @Column(unique = true)
    private String referenceNumber;

    @NotBlank(message = "Collection is required")
    private String collection;          // e.g. Submariner, Daytona, Datejust

    @NotBlank(message = "Category is required")
    private String category;            // Men / Women / Unisex

    private String caseMaterial;        // Oystersteel, 18k yellow gold, Rolesor...
    private String caseSize;            // 40mm, 41mm...
    private String dialColor;
    private String bracelet;
    private String movement;            // Calibre 3235 ...
    private String powerReserve;
    private String waterResistance;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than zero")
    @Column(precision = 19, scale = 2)
    private BigDecimal price;

    @PositiveOrZero
    private Integer stock = 0;

    private String imageUrl;

    @Column(length = 2000)
    private String description;

    private boolean featured;
}
