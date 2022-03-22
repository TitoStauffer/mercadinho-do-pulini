package com.ifes.service.service.mapper;

import com.ifes.service.domain.Category;
import com.ifes.service.service.dto.CategoryViewDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryViewMapper extends EntityMapper<Category, CategoryViewDTO>{
}
