package com.ifes.service.service.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class Relatorio1ResponseDTO implements Serializable {
    private Long id;
    private String description;
    private String totalValue;
    private String quantidade;

}
