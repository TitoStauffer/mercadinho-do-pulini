package com.ifes.service.service;

import com.ifes.service.domain.Category;
import com.ifes.service.repository.CategoryRepository;
import com.ifes.service.service.dto.SelectDTO;
import com.ifes.service.service.exception.RegraNegocioException;
import com.ifes.service.service.mapper.CategorySelectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategorySelectMapper categorySelectMapper;
    public List<SelectDTO> getAll() {
        List<Category> categories = categoryRepository.findAll();
        if(!categories.isEmpty()){
            return categorySelectMapper.toDTO(categories);
        } else {
            throw new RegraNegocioException(" Nenhuma categoria cadastrada");
        }
    }
}
