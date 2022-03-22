package com.ifes.service.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name = "product", schema = "public")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_product")
    @SequenceGenerator(name = "seq_product", allocationSize = 1, sequenceName = "seq_product")
    @Column(name = "id")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "inventory_weight")
    private Double inventoryWeight;

    @Column(name = "inventory_amount")
    private Integer inventoryAmount;

    @Column(name = "bar_code")
    private String barCode;

    @Column(name = "rfid")
    private String rfid;

    @Column(name = "purchase_price")
    private Double purchasePrice;

    @Column(name = "sale_price")
    private Double salePrice;

    @Column(name = "image")
    private String image;

    @Column(name = "is_coffee_shop")
    private boolean isCoffeeShop;

    @Column(name = "category_id")
    private Integer categoryId;
}
