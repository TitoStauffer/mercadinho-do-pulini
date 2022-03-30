package com.ifes.service.repository;

import com.ifes.service.domain.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

    List<Sale> findAllByUserId(Long id);

    List<Sale> findAllByProductisCoffeeShopAndUserId(boolean isCoffee, Long userId);
}
