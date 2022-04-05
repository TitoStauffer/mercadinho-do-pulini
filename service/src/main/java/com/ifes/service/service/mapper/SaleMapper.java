package com.ifes.service.service.mapper;

import com.ifes.service.domain.Sale;
import com.ifes.service.service.dto.SaleDTO;
import org.mapstruct.AfterMapping;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {UserMapper.class, ProductSaleMapper.class})
public interface SaleMapper extends EntityMapper<Sale, SaleDTO> {

    @Override
    @Mapping(source = "userId", target = "user.id")
    @Mapping(target = "amount", ignore = true)
    @Mapping(target = "weight", ignore = true)
    @Mapping(target = "productPrice", ignore = true)
    Sale toEntity(SaleDTO saleDTO);

    @Override
    @InheritInverseConfiguration
    SaleDTO toDTO(Sale sale);
}
