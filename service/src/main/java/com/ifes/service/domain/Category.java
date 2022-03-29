package com.ifes.service.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name = "category")
public class Category implements Serializable {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;
    private String description;
}
