package com.ifes.service.service.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ProductSaleDTO implements Serializable {
    private Long id;
    private String description;
    private Double price;
    private Double amount;
    private Integer weight;
    private String barCode;
    private String rfid;
    private String image;
}
