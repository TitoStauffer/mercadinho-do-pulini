package com.ifes.service.service;

import com.ifes.service.domain.Product;
import com.ifes.service.domain.Sale;
import com.ifes.service.domain.User;
import com.ifes.service.repository.ProductRepository;
import com.ifes.service.service.dto.ProductCreateDTO;
import com.ifes.service.service.dto.ProductEditDTO;
import com.ifes.service.service.dto.ProductSaleDTO;
import com.ifes.service.service.dto.Relatorio1RequestDTO;
import com.ifes.service.service.dto.Relatorio1ResponseDTO;
import com.ifes.service.service.mapper.ProductCreateMapper;
import com.ifes.service.service.mapper.ProductEditMapper;
import com.ifes.service.service.mapper.ProductSaleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private static final String MSG = "Product not found";
    private final ProductRepository productRepository;
    private final ProductCreateMapper productCreateMapper;
    private final ProductEditMapper productEditMapper;
    private final ProductSaleMapper productSaleMapper;

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

    public ProductSaleDTO getByRfidForSale(String rfid) {
        return productSaleMapper.toDTO(productRepository
                .findByRfid(rfid)
                .orElseThrow(() -> new RuntimeException(MSG)));
    }

    public List<Sale> stockOff(List<ProductSaleDTO> products, Long userId){
        List<Long> productsIds = getProductsIds(products);
        List<Product> stocksProducts = productRepository.findAllById(productsIds);

        return setStockOff(stocksProducts, products, userId);
    }

    private List<Sale> setStockOff(List<Product> stocksProducts, List<ProductSaleDTO> products, Long userId) {
        List<Sale> sales = new ArrayList<>();
        stocksProducts.forEach(stockProduct -> products.forEach( product -> {
            if(product.getId().equals(stockProduct.getId())){
                if(Objects.nonNull(stockProduct.getInventoryAmount()) && Objects.nonNull(product.getAmount())) {
                    stockProduct.setInventoryAmount(stockProduct.getInventoryAmount() - product.getAmount());
                }
                if(Objects.nonNull(stockProduct.getInventoryWeight()) && Objects.nonNull(product.getWeight())) {
                    stockProduct.setInventoryWeight(stockProduct.getInventoryWeight() - product.getWeight());
                }
                sales.add(createSale(stockProduct, product, userId));
            }
        }));
        productRepository.saveAllAndFlush(stocksProducts);
        return sales;
    }

    private Sale createSale(Product stockProduct, ProductSaleDTO product, Long userId) {
        Sale sale = new Sale();
        sale.setProduct(stockProduct);
        sale.setAmount(Double.parseDouble(product.getAmount().toString()));
        sale.setWeight(product.getWeight());
        sale.setProductPrice(stockProduct.getSalePrice());
        User user = new User();
        user.setId(userId);
        sale.setUser(user);

        return sale;
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

    public ProductEditDTO registerEntry(Long id, double amount) {
        Product current = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(MSG));
        if (Objects.nonNull(current.getInventoryAmount())) current.setInventoryAmount(current.getInventoryAmount() + (int) amount);
        if (Objects.nonNull(current.getInventoryWeight())) current.setInventoryWeight(current.getInventoryWeight() + amount);
        return update(productEditMapper.toDTO(current));
    }

    public String getByBarCodeFromMicroterminal(String barCode) {
        return productRepository.getProductFromMicroterminal(barCode);
    }

    public List<ProductSaleDTO> findAllByIsCoffe() {
        return productRepository.findAllByIsCoffe();
    }

    public List<Relatorio1ResponseDTO> getRelatorio1Result(Relatorio1RequestDTO id) {
        return null;
    }
}
