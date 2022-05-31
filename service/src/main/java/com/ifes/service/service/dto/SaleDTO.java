package com.ifes.service.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SaleDTO implements Serializable {

    private Long id;
    private Long userId;
    private List<ProductSaleDTO> products;
    private List<Long> otherUserIds = new ArrayList<>();
}
