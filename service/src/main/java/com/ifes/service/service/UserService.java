package com.ifes.service.service;

import com.ifes.service.repository.UserRepository;
import com.ifes.service.service.dto.UserDTO;
import com.ifes.service.service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserDTO> findAll() {
        return userMapper.toDTO(userRepository.findAll());
    }


}
