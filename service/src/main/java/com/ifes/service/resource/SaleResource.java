package com.ifes.service.resource;

import com.ifes.service.service.SaleService;
import com.ifes.service.service.dto.RelatorioRequestDTO;
import com.ifes.service.service.dto.RelatorioResponseDTO;
import com.ifes.service.service.dto.ProductSaleDTO;
import com.ifes.service.service.dto.SaleCancelProductDTO;
import com.ifes.service.service.dto.SaleDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sale")
public class SaleResource {

    private final SaleService saleService;

    @PostMapping
    public void finalizeSale(@RequestBody SaleDTO sale){
        this.saleService.finishSale(sale, false);
    }

    @PostMapping("/cafeteria")
    public void finalizeSaleCoffee(@RequestBody SaleDTO sale){
        this.saleService.finishSale(sale, true);
    }

    @GetMapping("/{id}")
    public List<SaleDTO> findAllSalesById(@PathVariable(name = "id") Long id) {
        return saleService.findAllSalesByUserId(id);
    }

    @GetMapping("/cafeteria/{id}")
    public List<SaleDTO> findAllCoffeeSaleById(@PathVariable(name = "id") Long id){
        return this.saleService.findAllCoffeeSaleAndIsUserId(id, true);
    }

    @PostMapping("/cancelar")
    public void removeItemCoffeeShopSaleItem(@RequestBody SaleCancelProductDTO saleCancelProduct){
        this.saleService.removeItemCoffeeShopSale(saleCancelProduct);
    }

    @GetMapping("/aberta/{id}")
    public ResponseEntity<List<ProductSaleDTO>> getOpenSalesByUserId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(saleService.getOpenSaleByUserId(id));
    }

    @PostMapping("/relatorio1")
    public List<RelatorioResponseDTO> findRelatorio1(@RequestBody RelatorioRequestDTO relatorioRequestDTO){
        return this.saleService.findRelatorio1(relatorioRequestDTO);
    }

    @PostMapping("/relatorio2")
    public List<RelatorioResponseDTO> findRelatorio2(@RequestBody RelatorioRequestDTO relatorioRequestDTO){
        return this.saleService.findRelatorio2(relatorioRequestDTO);
    }

    @PostMapping("/relatorio3")
    public List<RelatorioResponseDTO> findRelatorio3(@RequestBody RelatorioRequestDTO relatorioRequestDTO){
        return this.saleService.findRelatorio3(relatorioRequestDTO);
    }


    @PostMapping("/relatorio4")
    public List<RelatorioResponseDTO> findRelatorio4(@RequestBody RelatorioRequestDTO relatorioRequestDTO){
        return this.saleService.findRelatorio4(relatorioRequestDTO);
    }

}
