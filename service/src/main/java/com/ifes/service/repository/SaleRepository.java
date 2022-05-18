package com.ifes.service.repository;

import com.ifes.service.domain.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

    ArrayList<Sale> findAllByProductIsCoffeeShopAndUserId(boolean isCoffee, Long userId);

    List<Sale> findAllByUserId(Long id);

    ArrayList<Sale> findAllByProductIsCoffeeShopAndId(boolean isCoffee, Long id);
}
