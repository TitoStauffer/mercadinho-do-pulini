package com.ifes.service.service;

import com.ifes.service.domain.Category;
import com.ifes.service.repository.CategoryRepository;
import com.ifes.service.service.dto.CategoryViewDTO;
import com.ifes.service.service.mapper.CategoryViewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryViewMapper categoryViewMapper;

    public List<CategoryViewDTO> getAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories.isEmpty() ? new ArrayList<>() : categoryViewMapper.toDTO(categories);
    }
}
