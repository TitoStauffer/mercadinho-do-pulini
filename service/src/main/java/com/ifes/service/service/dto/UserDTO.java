package com.ifes.service.service.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO implements Serializable {
    private Long id;
    private String name;
    private String profile;
    private String cpf;
    private String fingerprint;
}
