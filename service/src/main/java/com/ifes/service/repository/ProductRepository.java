package com.ifes.service.repository;

import com.ifes.service.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByBarCode(String barCode);
    Optional<Product> findByRfid(String rfid);

    @Query("select CONCAT(p.description, ' - R$ ', p.salePrice) from Product p where p.barCode = :barcode")
    String getProductFromMicroterminal(@Param("barcode") String barCode);


}
