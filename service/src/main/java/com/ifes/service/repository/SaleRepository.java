package com.ifes.service.repository;

import com.ifes.service.domain.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

    ArrayList<Sale> findAllByProductIsCoffeeShopAndUserId(boolean isCoffee, Long userId);

    List<Sale> findAllByUserId(Long id);

    ArrayList<Sale> findAllByProductIsCoffeeShopAndId(boolean isCoffee, Long id);

    List<Sale> findAllByUserIdAndStatus(Long userId, String status);

    @Modifying
    @Query("update Sale s set s.status = 'Pendente' where s.user.id = :userId or s.user.id in :otherUsers")
    void finishCoffeeSales(@Param("userId") Long userId, @Param("otherUsers") List<Long> otherUserIds);
}
