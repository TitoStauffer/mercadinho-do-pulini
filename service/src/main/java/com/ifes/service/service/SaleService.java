package com.ifes.service.service;

import com.ifes.service.domain.Product;
import com.ifes.service.domain.Sale;
import com.ifes.service.repository.ProductRepository;
import com.ifes.service.repository.SaleRepository;
import com.ifes.service.service.dto.ProductSaleDTO;
import com.ifes.service.service.dto.Relatorio1RequestDTO;
import com.ifes.service.service.dto.Relatorio1ResponseDTO;
import com.ifes.service.service.dto.SaleCancelProductDTO;
import com.ifes.service.service.dto.SaleDTO;
import com.ifes.service.service.mapper.ProductSaleMapper;
import com.ifes.service.service.mapper.SaleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;

    private final ProductRepository productRepository;

    private final SaleMapper saleMapper;

    private final ProductService productService;

    private final ProductSaleMapper productSaleMapper;

    private static final String FINISHED = "Finalizado";
    private static final String AWAITING = "Pendente";

    public void finishSale(SaleDTO sale, Boolean isCoffee){
        List<Sale> sales = productService.stockOff(sale.getProducts(), sale.getUserId());
        sales.forEach(sale1 -> {
            sale1.setStatus(isCoffee ? FINISHED : AWAITING);
            sale1.setSaleDate(LocalDateTime.now());
        });
        saleRepository.saveAllAndFlush(sales);
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

    public List<Relatorio1ResponseDTO> findRelatorio1(Relatorio1RequestDTO relatorio1RequestDTO) {
        List<Sale> sales = saleRepository.findAllBySaleDateBetween(relatorio1RequestDTO.getDataInicio(), relatorio1RequestDTO.getDataFim());
        List<Product> products = productRepository.findAll();

        return products.stream().map(product -> {
            Relatorio1ResponseDTO dto = new Relatorio1ResponseDTO();
            List<Sale> productSale = findAllSaleByProduct(product.getId(), sales);
            dto.setDescription(productSale.get(0).getProduct().getDescription());
            dto.setQuantidade(productSale.stream().map(Sale::getAmount).mapToDouble(amount -> amount).sum());
            dto.setTotalValue(productSale.stream().map(sale -> sale.getProductPrice() * sale.getAmount()).mapToDouble(price -> price).sum());
            return dto;
        }).toList();
    }

    private List<Sale> findAllSaleByProduct(Long id, List<Sale> sales) {
        return sales.stream().filter(sale -> sale.getProduct().getId().equals(id)).collect(Collectors.toList());
    }
}
