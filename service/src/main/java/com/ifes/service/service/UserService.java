package com.ifes.service.service;

import com.ifes.service.domain.User;
import com.ifes.service.repository.UserRepository;
import com.ifes.service.service.dto.LoginDTO;
import com.ifes.service.service.dto.UserDTO;
import com.ifes.service.service.exception.RegraNegocioException;
import com.ifes.service.service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
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
        if (cpf.length() != 11) {
            throw new RegraNegocioException("Usuario não encontrado");
        }
        User user = userRepository.findByCpf(cpf);

        if (Objects.isNull(user)) {
            throw new RegraNegocioException("Usuario não encontrado");
        }

        return userMapper.toDTO(user);
    }

    public UserDTO login(LoginDTO loginDTO) {
        if (!loginDTO.getCpf().equals(loginDTO.getPassword())) {
            throw new RegraNegocioException("Credencial errada");
        }
        if (loginDTO.getCpf().length() != 11) {
            throw new RegraNegocioException("Usuario não encontrado");
        }
        User user = userRepository.findByCpf(loginDTO.getCpf());

        if (Objects.isNull(user)) {
            throw new RegraNegocioException("Usuario não encontrado");
        }

        return userMapper.toDTO(user);
    }

    public UserDTO save(UserDTO userDTO) {
        User user = userRepository.save(userMapper.toEntity(userDTO));
        return userMapper.toDTO(user);
    }


    public UserDTO getByRfid(String rfid) {
        User entity = userRepository.findByRfid(rfid)
                .orElseThrow(() -> new RegraNegocioException("Usuario não encontrado"));
        return userMapper.toDTO(entity);
    }
    public UserDTO findByRFID(String rfid) {
        User user = userRepository.findByRfid(rfid).orElseThrow(() -> new RegraNegocioException("Usuario não encontrado"));
        return userMapper.toDTO(user);
    }
}
