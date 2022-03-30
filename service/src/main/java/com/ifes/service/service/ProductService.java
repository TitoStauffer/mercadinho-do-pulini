package com.ifes.service.service;

import com.ifes.service.domain.Product;
import com.ifes.service.repository.ProductRepository;
import com.ifes.service.service.dto.ProductCreateDTO;
import com.ifes.service.service.dto.ProductEditDTO;
import com.ifes.service.service.dto.ProductSaleDTO;
import com.ifes.service.service.mapper.ProductCreateMapper;
import com.ifes.service.service.mapper.ProductEditMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private static final String MSG = "Product not found";
    private final ProductRepository productRepository;
    private final ProductCreateMapper productCreateMapper;
    private final ProductEditMapper productEditMapper;

    public ProductCreateDTO save(ProductCreateDTO dto) {
        return productCreateMapper.toDTO(productRepository
                .save(productCreateMapper.toEntity(dto)));
    }

    public ProductEditDTO update(ProductEditDTO dto) {
        var existent = productRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException(MSG));
        var product = productEditMapper.toEntity(dto);
        BeanUtils.copyProperties(product, existent, "id");
        productRepository.save(existent);
        return productEditMapper.toDTO(existent);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public List<ProductEditDTO> getAll() {
        List<Product> products = productRepository.findAll();
        return products.isEmpty() ? new ArrayList<>() : productEditMapper.toDTO(products);
    }

    public ProductEditDTO getById(Long id) {
        return productEditMapper.toDTO(productRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(MSG)));
    }

    public ProductEditDTO getByBarCode(String barCode) {
        return productEditMapper.toDTO(productRepository
                .findByBarCode(barCode)
                .orElseThrow(() -> new RuntimeException(MSG)));
    }

    public ProductEditDTO getByRfid(String rfid) {
        return productEditMapper.toDTO(productRepository
                .findByRfid(rfid)
                .orElseThrow(() -> new RuntimeException(MSG)));
    }

    public void stockOff(List<ProductSaleDTO> products){
        List<Long> productsIds = getProductsIds(products);
        List<Product> stocksProducts = productRepository.findAllById(productsIds);
        setStockOff(stocksProducts, products);
    }

    private void setStockOff(List<Product> stocksProducts, List<ProductSaleDTO> products) {
        stocksProducts.forEach(stockProduct -> products.forEach( product -> {
            if(product.getId().equals(stockProduct.getId())){
                stockProduct.setInventoryAmount(stockProduct.getInventoryAmount() - product.getAmount());
                stockProduct.setInventoryWeight(stockProduct.getInventoryWeight() - product.getWeight());
            }
        }));
        productRepository.saveAllAndFlush(stocksProducts);
    }

    private List<Long> getProductsIds(List<ProductSaleDTO> products) {
        List<Long> ids = new ArrayList<>();
        products.forEach(product -> {
            if(!ids.contains(product.getId())){
                ids.add(product.getId());
            }
        });
        return ids;
    }

    public ProductEditDTO registerEntry(Long id, Integer amount, Double weight) {
        Product current = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(MSG));
        if (amount != null) current.setInventoryAmount(current.getInventoryAmount() + amount);
        if (weight != null) current.setInventoryWeight(current.getInventoryWeight() + weight);
        return update(productEditMapper.toDTO(current));
    }
}
