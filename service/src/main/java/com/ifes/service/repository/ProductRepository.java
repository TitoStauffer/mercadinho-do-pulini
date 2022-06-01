package com.ifes.service.repository;

import com.ifes.service.domain.Product;
import com.ifes.service.service.dto.ProductSaleDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByBarCode(String barCode);
    Optional<Product> findByRfid(String rfid);

    @Query("select CONCAT(p.description, ' - R$ ', p.salePrice, ' - Qtd: ', coalesce(p.inventoryAmount, p.inventoryWeight)) from Product p where p.barCode = :barcode")
    String getProductFromMicroterminal(@Param("barcode") String barCode);

    @Query("select new com.ifes.service.service.dto.ProductSaleDTO(p.id, p.description, p.salePrice, p.barCode, p.image) from Product p where p.isCoffeeShop = true")
    Optional<List<ProductSaleDTO>> findAllByIsCoffe();
}
