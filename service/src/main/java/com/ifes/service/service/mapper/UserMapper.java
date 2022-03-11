package com.ifes.service.service.mapper;

import com.ifes.service.domain.User;
import com.ifes.service.service.dto.UserDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper extends EntityMapper<User, UserDTO> {
}
