package com.ifes.service.service;

import com.ifes.service.domain.Sale;
import com.ifes.service.repository.SaleRepository;
import com.ifes.service.service.dto.ProductSaleDTO;
import com.ifes.service.service.dto.SaleCancelProductDTO;
import com.ifes.service.service.dto.SaleDTO;
import com.ifes.service.service.mapper.ProductSaleMapper;
import com.ifes.service.service.mapper.SaleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;

    private final SaleMapper saleMapper;

    private final ProductService productService;

    private final ProductSaleMapper productSaleMapper;

    private static final String FINISHED = "Finalizado";
    private static final String AWAITING = "Pendente";

    public void finishSale(SaleDTO sale, Boolean isCoffee){
        List<Sale> sales = productService.stockOff(sale.getProducts(), sale.getUserId(), isCoffee);
        sales.forEach(sale1 -> sale1.setStatus(isCoffee ? FINISHED : AWAITING));
        saleRepository.saveAllAndFlush(sales);
        saleRepository.finishCoffeeSales(sale.getUserId(), sale.getOtherUserIds());
    }

    public List<SaleDTO> findAllCoffeeSaleAndIsUserId(Long id, boolean isUserId) {
        ArrayList<Sale> sales;
        if(isUserId){
            sales = saleRepository.findAllByProductIsCoffeeShopAndUserId(true, id);
        }else {
            sales = saleRepository.findAllByProductIsCoffeeShopAndId(true, id);
        }
        var salesDTO = new ArrayList<SaleDTO>();
        SaleDTO saleDTO;
        for(Sale sale : sales){
            if(sale.getProduct() != null){
                saleDTO = convertToDTO(sale);
                salesDTO.add(saleDTO);
                saleRepository.save(convertToEntity(saleDTO));
            }
        }
         return salesDTO;
    }

    public SaleDTO convertToDTO(Sale sale){
        var productSaleDTO = productSaleMapper.toDTO(sale.getProduct());
        var saleDTO = saleMapper.toDTO(sale);
        if(productSaleDTO != null && sale.getProduct() != null){
            if(sale.getAmount() != null){
                productSaleDTO.setAmount(sale.getAmount().intValue());
            }
            if(sale.getWeight() != null){
                productSaleDTO.setWeight(sale.getWeight());
            }
            productSaleDTO.setTotalPrice(getTotal(productSaleDTO));
        }
        saleDTO.setProducts(Collections.singletonList(productSaleDTO));
        return saleDTO;
    }

    public Sale convertToEntity(SaleDTO saleDTO){
        return saleRepository.findById(saleDTO.getId()).orElseThrow();
    }

    private Double getTotal(ProductSaleDTO productSaleDTO){
        if(productSaleDTO.getAmount() == null){
            return productSaleDTO.getWeight() * productSaleDTO.getPrice();
        }else {
            return productSaleDTO.getAmount() * productSaleDTO.getPrice();
        }
    }

    public void removeItemCoffeeShopSale(SaleCancelProductDTO saleCancelProduct) {
        var sale = saleRepository.findById(saleCancelProduct.getSaleId()).orElseThrow( () -> new RuntimeException("Venda não encontrada!"));
        if(sale.getProduct().getId().equals(saleCancelProduct.getProductId())){
            saleRepository.delete(sale);
        }
    }

    public List<SaleDTO> findAllSalesByUserId(Long id) {
        var salesDTO = new ArrayList<SaleDTO>();
        var sales = saleRepository.findAllByUserId(id);
        sales.forEach(sale -> {
            if(sale.getProduct() != null){
                salesDTO.add(convertToDTO(sale));
            }
        });
        return salesDTO;
    }
}
