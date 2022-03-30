package com.ifes.service.resource;

import com.ifes.service.service.SaleService;
import com.ifes.service.service.dto.SaleDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sale")
public class SaleResource {

    private final SaleService saleService;

    @PostMapping
    public void finalizeSale(@RequestBody SaleDTO sale){
        this.saleService.finishSale(sale);
    }

    @GetMapping("/coffee/{id}")
    public List<SaleDTO> findAllCoffeeSaleById(@RequestParam("id") Long id){
        return this.saleService.findAllCoffeeSaleById(id);
    }
}
