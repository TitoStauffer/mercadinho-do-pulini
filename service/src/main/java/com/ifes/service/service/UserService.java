package com.ifes.service.service;

import com.ifes.service.domain.User;
import com.ifes.service.repository.UserRepository;
import com.ifes.service.service.dto.UserDTO;
import com.ifes.service.service.exception.RegraNegocioException;
import com.ifes.service.service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserDTO> findAll() {
        return userMapper.toDTO(userRepository.findAll());
    }

    public UserDTO findById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RegraNegocioException("Usuario não encontrado"));
        return userMapper.toDTO(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public UserDTO findByCPF(String cpf) {
        User user = userRepository.findByCpf(cpf);

        if (Objects.isNull(user)) {
            throw new RegraNegocioException("Usuario não encontrado");
        }

        return userMapper.toDTO(user);
    }

    public UserDTO save(UserDTO userDTO) {
        User user = userRepository.save(userMapper.toEntity(userDTO));
        return userMapper.toDTO(user);
    }


}
