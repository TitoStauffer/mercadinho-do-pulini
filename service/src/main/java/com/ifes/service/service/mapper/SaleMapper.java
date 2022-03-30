package com.ifes.service.service.mapper;

import com.ifes.service.domain.Sale;
import com.ifes.service.service.dto.SaleDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SaleMapper extends EntityMapper<Sale, SaleDTO> {

    @Override
    @Mapping(source = "userId", target = "user.id")
    Sale toEntity(SaleDTO saleDTO);

    @Override
    @InheritInverseConfiguration
    SaleDTO toDTO(Sale sale);
}
