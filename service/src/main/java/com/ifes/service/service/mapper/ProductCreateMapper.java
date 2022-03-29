package com.ifes.service.service.mapper;

import com.ifes.service.domain.Product;
import com.ifes.service.service.dto.ProductCreateDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductCreateMapper extends EntityMapper<Product, ProductCreateDTO> {
}
