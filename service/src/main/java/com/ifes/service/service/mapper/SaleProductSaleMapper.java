package com.ifes.service.service.mapper;

import com.ifes.service.domain.Sale;
import com.ifes.service.service.dto.ProductSaleDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SaleProductSaleMapper extends EntityMapper<Sale, ProductSaleDTO> {
    @Override
    @Mapping(source = "description", target = "product.description")
    @Mapping(source = "price", target = "productPrice")
    @Mapping(source = "barCode", target = "product.barCode")
    @Mapping(source = "image", target = "product.image")
    @Mapping(source = "rfid", target = "product.rfid")
    Sale toEntity(ProductSaleDTO dto);

    @Override
    @InheritInverseConfiguration
    ProductSaleDTO toDTO(Sale entity);
}
