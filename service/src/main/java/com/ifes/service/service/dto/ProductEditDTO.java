package com.ifes.service.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class ProductEditDTO implements Serializable {
    private Long id;
    private String description;
    private Double inventoryWeight;
    private String inventoryAmount;
    private String barCode;
    private String rfid;
    private Double purchasePrice;
    private Double salePrice;
    private String image;
    private boolean isCoffeeShop;
    private Integer categoryId;
}
