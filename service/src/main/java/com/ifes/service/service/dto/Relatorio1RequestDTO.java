package com.ifes.service.service.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class Relatorio1RequestDTO implements Serializable {
    private LocalDate dataInicio;
    private LocalDate dataFim;
}
