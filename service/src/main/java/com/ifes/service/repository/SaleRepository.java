package com.ifes.service.repository;

import com.ifes.service.domain.Sale;
import com.ifes.service.service.dto.Relatorio1ResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

    ArrayList<Sale> findAllByProductIsCoffeeShopAndUserId(boolean isCoffee, Long userId);

    List<Sale> findAllByUserId(Long id);

    ArrayList<Sale> findAllByProductIsCoffeeShopAndId(boolean isCoffee, Long id);

    List<Sale> findAllBySaleDateBetween(@Param("dataInicio") LocalDateTime dataInicio, @Param("dataFim") LocalDateTime dataFim);

}
