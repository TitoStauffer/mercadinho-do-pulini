package com.ifes.service.service;

import com.ifes.service.domain.Product;
import com.ifes.service.repository.ProductRepository;
import com.ifes.service.service.dto.ProductCreateDTO;
import com.ifes.service.service.dto.ProductEditDTO;
import com.ifes.service.service.mapper.ProductCreateMapper;
import com.ifes.service.service.mapper.ProductEditMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductCreateMapper productCreateMapper;
    private final ProductEditMapper productEditMapper;

    private static final String MSG = "Product not found";

    public ProductCreateDTO save(ProductCreateDTO dto) {
        return productCreateMapper.toDTO(productRepository
                .save(productCreateMapper.toEntity(dto)));
    }

    public ProductEditDTO update(ProductEditDTO dto) {
        Product existent = productRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException(MSG));
        Product product = productEditMapper.toEntity(dto);
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
}
