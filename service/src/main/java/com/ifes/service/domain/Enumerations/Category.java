package com.ifes.service.domain.Enumerations;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Category {

    Massas(1L, "Massas"),
    Bebidas(2L, "Bebidas");

    private final Long code;
    private final String description;

    public static String getDescriptionByCode(Long code) {
        for(Category value : Category.values()) {
            if(value.getCode().equals(code)) {
                return value.getDescription();
            }
        }
        throw new IllegalArgumentException("Cutting Register Status not found");
    }
}
