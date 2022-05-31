package com.ifes.service.service.mapper;

import com.ifes.service.domain.Category;
import com.ifes.service.service.dto.SelectDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategorySelectMapper extends EntityMapper<Category, SelectDTO> {

    @Override
    @Mapping(source = "value", target = "id")
    @Mapping(source = "label", target = "description")
    Category toEntity(SelectDTO selectDTO);

    @Override
    @InheritInverseConfiguration
    SelectDTO toDTO(Category category);
}
