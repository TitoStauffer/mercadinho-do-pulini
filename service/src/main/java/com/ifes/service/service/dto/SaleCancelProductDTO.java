package com.ifes.service.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SaleCancelProductDTO {

    private Long saleId;
    private Long productId;
}
