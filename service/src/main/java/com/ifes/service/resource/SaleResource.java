package com.ifes.service.resource;

import com.ifes.service.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sale")
public class SaleResource {

    private final SaleService saleService;

    
}
