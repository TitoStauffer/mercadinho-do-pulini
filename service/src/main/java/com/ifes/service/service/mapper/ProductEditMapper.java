package com.ifes.service.service.mapper;

import com.ifes.service.domain.Product;
import com.ifes.service.service.dto.ProductEditDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductEditMapper extends EntityMapper<Product,ProductEditDTO>{

}
