package com.ifes.service.domain.Enumerations;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Permission {

    teste(1L, "teste");

    private final Long code;
    private final String description;
}
