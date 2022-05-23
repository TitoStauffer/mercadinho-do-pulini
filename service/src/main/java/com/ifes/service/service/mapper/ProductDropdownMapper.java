package com.ifes.service.service.mapper;

import com.ifes.service.domain.Product;
import com.ifes.service.service.dto.ProductDropdownDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductDropdownMapper extends EntityMapper<Product, ProductDropdownDTO>{
}
