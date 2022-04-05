package com.ifes.service.service;

import com.ifes.service.repository.SaleRepository;
import com.ifes.service.service.dto.SaleDTO;
import com.ifes.service.service.mapper.SaleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;

    private final SaleMapper saleMapper;

    private final ProductService productService;

    private static final String FINISHED = "Finalizado";

    public void finishSale(SaleDTO sale){
        var finishedSale = saleMapper.toEntity(sale);
        productService.stockOff(sale.getProducts());
        finishedSale.setStatus(FINISHED);
        saleRepository.save(finishedSale);
    }

    public List<SaleDTO> findAllCoffeeSaleById(Long id) {
        return saleMapper.toDTO(saleRepository.findAllByProductIsCoffeeShopAndUserId(true, id));
    }
}
