package com.ifes.service.service;

import com.ifes.service.domain.Enumerations.Category;
import com.ifes.service.domain.Product;
import com.ifes.service.domain.Sale;
import com.ifes.service.domain.User;
import com.ifes.service.repository.ProductRepository;
import com.ifes.service.repository.SaleRepository;
import com.ifes.service.repository.UserRepository;
import com.ifes.service.service.dto.ProductSaleDTO;
import com.ifes.service.service.dto.RelatorioRequestDTO;
import com.ifes.service.service.dto.RelatorioResponseDTO;
import com.ifes.service.service.dto.SaleCancelProductDTO;
import com.ifes.service.service.dto.SaleDTO;
import com.ifes.service.service.mapper.ProductSaleMapper;
import com.ifes.service.service.mapper.SaleMapper;
import com.ifes.service.service.mapper.SaleProductSaleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;
    private final SaleMapper saleMapper;

    private final ProductService productService;

    private final ProductSaleMapper productSaleMapper;

    private final SaleProductSaleMapper saleProductSaleMapper;

    private static final String FINISHED = "Finalizado";
    private static final String AWAITING = "Pendente";

    public void finishSale(SaleDTO sale, Boolean isCoffee){
        List<Sale> sales = productService.stockOff(sale.getProducts(), sale.getUserId(), isCoffee);
        sales.forEach(sale1 -> {
            sale1.setStatus(isCoffee ? FINISHED : AWAITING);
            sale1.setSaleDate(LocalDateTime.now());
        });
        saleRepository.saveAllAndFlush(sales);
        if(Boolean.FALSE.equals(isCoffee)) {
            saleRepository.finishCoffeeSales(sale.getUserId(), sale.getOtherUserIds());
        }
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

    public List<RelatorioResponseDTO> findRelatorio1(RelatorioRequestDTO relatorioRequestDTO) {
        List<Sale> sales = saleRepository.findAllBySaleDateBetween(relatorioRequestDTO.getDataInicio(), relatorioRequestDTO.getDataFim());
        List<Product> products = productRepository.findAll();
        if (sales.size() == 0) {
            return new ArrayList<>();
        }
        return products.stream().map(product -> {
            RelatorioResponseDTO dto = new RelatorioResponseDTO();
            List<Sale> productSale = findAllSaleByProduct(product.getId(), sales);
            dto.setDescription(productSale.get(0).getProduct().getDescription());
            dto.setQuantidade(productSale.stream().map(Sale::getAmount).mapToDouble(amount -> amount).sum());
            dto.setTotalValue(productSale.stream().map(sale -> sale.getProductPrice() * sale.getAmount()).mapToDouble(price -> price).sum());
            return dto;
        }).toList();
    }

    public List<RelatorioResponseDTO> findRelatorio2(RelatorioRequestDTO relatorioRequestDTO) {
        List<Sale> sales = saleRepository.findAllBySaleDateBetween(relatorioRequestDTO.getDataInicio(), relatorioRequestDTO.getDataFim());
        List<User> users = userRepository.findAll();
        if (sales.size() == 0) {
            return new ArrayList<>();
        }
        return users.stream().map(user -> {
            RelatorioResponseDTO dto = new RelatorioResponseDTO();
            List<Sale> productSale = findAllSaleByUser(user.getId(), sales);
            dto.setDescription(user.getName());
            dto.setTotalValue(productSale.stream().map(sale -> sale.getProductPrice() * sale.getAmount()).mapToDouble(price -> price).sum());
            return dto;
        }).toList();
    }

    public List<RelatorioResponseDTO> findRelatorio3(RelatorioRequestDTO relatorioRequestDTO) {
        List<Sale> sales = saleRepository.findAllBySaleDateBetween(relatorioRequestDTO.getDataInicio(), relatorioRequestDTO.getDataFim());

        if (sales.size() == 0) {
            return new ArrayList<>();
        }
        List<Sale> salesCafeteria = findAllSaleCafeteria(sales);
        List<Sale> salesMercado = findAllSaleMercado(sales);

        RelatorioResponseDTO dtoCafeteria = new RelatorioResponseDTO();
        dtoCafeteria.setDescription("Cafeteria");
        dtoCafeteria.setTotalValue(salesCafeteria.stream().map(sale -> sale.getProductPrice() * sale.getAmount()).mapToDouble(price -> price).sum());

        RelatorioResponseDTO dtoMercado = new RelatorioResponseDTO();
        dtoMercado.setDescription("Mercado");
        dtoMercado.setTotalValue(salesMercado.stream().map(sale -> sale.getProductPrice() * sale.getAmount()).mapToDouble(price -> price).sum());

        return  Stream.of(dtoMercado, dtoCafeteria).toList();
    }

    public List<RelatorioResponseDTO> findRelatorio4(RelatorioRequestDTO relatorioRequestDTO) {
        List<Sale> sales = saleRepository.findAllBySaleDateBetween(relatorioRequestDTO.getDataInicio(), relatorioRequestDTO.getDataFim());
        List<Long> categories = Stream.of(Category.Massas.getCode(), Category.Bebidas.getCode()).toList();

        return categories.stream().map(category -> {
            RelatorioResponseDTO dto = new RelatorioResponseDTO();
            List<Sale> productSale = findAllSaleByProductType(category, sales);
            dto.setDescription(Category.getDescriptionByCode(category));
            dto.setTotalValue(productSale.stream().map(sale -> sale.getProductPrice() * sale.getAmount()).mapToDouble(price -> price).sum());
            return dto;
        }).toList();
    }
    private List<Sale> findAllSaleByProductType(Long id, List<Sale> sales) {
        return sales.stream().filter(sale -> sale.getProduct().getCategoryId().equals(id.intValue())).collect(Collectors.toList());
    }

    private List<Sale> findAllSaleByProduct(Long id, List<Sale> sales) {
        return sales.stream().filter(sale -> sale.getProduct().getId().equals(id)).collect(Collectors.toList());
    }

    private List<Sale> findAllSaleByUser(Long id, List<Sale> sales) {
        return sales.stream().filter(sale -> sale.getUser().getId().equals(id)).collect(Collectors.toList());
    }

    private List<Sale> findAllSaleCafeteria(List<Sale> sales) {
        return sales.stream().filter(sale -> sale.getProduct().isCoffeeShop()).collect(Collectors.toList());
    }

    private List<Sale> findAllSaleMercado(List<Sale> sales) {
        return sales.stream().filter(sale -> !sale.getProduct().isCoffeeShop()).collect(Collectors.toList());
    }

    public List<ProductSaleDTO> getOpenSaleByUserId(Long id) {
        List<Sale> sales = saleRepository.findAllByUserIdAndStatus(id, AWAITING);
        List<ProductSaleDTO> products = saleProductSaleMapper.toDTO(sales);
        products.forEach(item -> item.setTotalPrice(
                        item.getPrice() *
                                (Objects.nonNull(item.getAmount()) ? item.getAmount() : item.getWeight())
                )
        );
        return products;
    }

}
