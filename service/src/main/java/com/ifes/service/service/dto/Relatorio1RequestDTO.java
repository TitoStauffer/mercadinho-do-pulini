package com.ifes.service.service.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
public class Relatorio1RequestDTO implements Serializable {
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
}
