package com.ifes.service.service.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class Relatorio1ResponseDTO implements Serializable {
    private String description;
    private Double totalValue;
    private Double quantidade;

}
