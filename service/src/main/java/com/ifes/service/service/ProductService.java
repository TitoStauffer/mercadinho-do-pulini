package com.ifes.service.service;

import com.ifes.service.domain.Product;
import com.ifes.service.domain.Sale;
import com.ifes.service.domain.User;
import com.ifes.service.repository.ProductRepository;
import com.ifes.service.service.dto.ProductCreateDTO;
import com.ifes.service.service.dto.ProductDropdownDTO;
import com.ifes.service.service.dto.ProductEditDTO;
import com.ifes.service.service.dto.ProductSaleDTO;
import com.ifes.service.service.exception.RegraNegocioException;
import com.ifes.service.service.mapper.ProductCreateMapper;
import com.ifes.service.service.mapper.ProductDropdownMapper;
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
    private final ProductDropdownMapper productDropdownMapper;

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

    public List<Sale> stockOff(List<ProductSaleDTO> saleProducts, Long userId){
        List<Sale> sale = new ArrayList<>();

        saleProducts.forEach(saleProduct -> {
            var product = this.findById(saleProduct.getId());
            quantityAndHeightCalculator(saleProduct, product);
            sale.add(newCreateSale(saleProduct, this.findById(saleProduct.getId()), userId));
        });

        return sale;
    }

    private void quantityAndHeightCalculator(ProductSaleDTO saleProduct, Product product){
        if (Objects.nonNull(product.getInventoryAmount()) && Objects.nonNull(saleProduct.getAmount())) {
            this.quantityValidator(saleProduct, product);
        } else {
            this.weightValidator(saleProduct, product);
        }
        productRepository.saveAndFlush(product);
    }

    private void quantityValidator(ProductSaleDTO saleProduct, Product product) {
            if (saleProduct.getAmount() <= product.getInventoryAmount()) {
                product.setInventoryAmount(product.getInventoryAmount() - saleProduct.getAmount());
            } else {
                throw new RegraNegocioException("Quantidade do produto na venda maior do que a quantidade em estoque");
            }
        }

    private void weightValidator(ProductSaleDTO saleProduct, Product product){
        if(saleProduct.getWeight() <= product.getInventoryWeight()){
            product.setInventoryWeight(product.getInventoryWeight() - saleProduct.getWeight());
        }else {
            throw new RegraNegocioException("Peso do produto na venda maior do que a peso em estoque");
        }
    }

    private Sale newCreateSale(ProductSaleDTO productSale, Product product, Long userId){
        var sale = new Sale();
        var user = new User();

        user.setId(userId);
        sale.setAmount(Objects.nonNull(productSale.getAmount()) ? Double.parseDouble(productSale.getAmount().toString()) : null);
        sale.setWeight(Objects.nonNull(productSale.getWeight()) ? productSale.getWeight() : null);
        sale.setProduct(product);
        sale.setProductPrice(productSale.getPrice());
        sale.setUser(user);

        return sale;
    }

    private Product findById(Long id){
        return productRepository.findById(id).orElseThrow(() -> new RegraNegocioException("Produto não encontrado"));
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
        if(productRepository.findAllByIsCoffe().isPresent() && productRepository.findAllByIsCoffe().get().size() != 0){
            return productRepository.findAllByIsCoffe().get();
        }else {
            throw new RegraNegocioException("Nenhum produto cadastrado");
        }
    }

    public List<ProductDropdownDTO> getAllProductDropDown(){
        return productDropdownMapper.toDTO(productRepository.findAll());
    }

    public ProductSaleDTO getByBarCodeForSale(String barCode) {
        return productSaleMapper.toDTO(productRepository
                .findByBarCode(barCode)
                .orElseThrow(() -> new RuntimeException(MSG)));
    }
}
