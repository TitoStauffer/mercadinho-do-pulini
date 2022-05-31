package com.ifes.service.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class ProductSaleDTO implements Serializable {
    private Long id;
    private String description;
    private Double price;
    private Integer amount;
    private Double weight;
    private String barCode;
    private String image;
    private Double totalPrice;
    private String rfid;
    private Long saleId;

    public ProductSaleDTO(Long id, String description, Double price, String barCode, String image) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.barCode = barCode;
        this.image = image;
    }
}
