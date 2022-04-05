package com.ifes.service.service.mapper;

import com.ifes.service.domain.Product;
import com.ifes.service.service.dto.ProductSaleDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductSaleMapper extends EntityMapper<Product, ProductSaleDTO> {

    @Override
    @Mapping(source = "price" , target = "salePrice")
    Product toEntity(ProductSaleDTO productSaleDTO);

    @Override
    @InheritInverseConfiguration
    ProductSaleDTO toDTO(Product product);
}
