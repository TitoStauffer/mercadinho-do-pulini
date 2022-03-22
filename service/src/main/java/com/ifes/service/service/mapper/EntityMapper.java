package com.ifes.service.service.mapper;

import java.util.List;


public interface EntityMapper<Entity, DTO> {
  Entity toEntity(DTO dto);

  DTO toDTO(Entity entity);

  Iterable<DTO> iterableToDTO(Iterable<Entity> entities);

  List<DTO> toDTO(List<Entity> entities);

  List<Entity> toEntity(List<DTO> dtos);
}
