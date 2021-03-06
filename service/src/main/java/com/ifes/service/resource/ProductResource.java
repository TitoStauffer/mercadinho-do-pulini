package com.ifes.service.resource;

import com.ifes.service.service.ProductService;
import com.ifes.service.service.dto.ProductCreateDTO;
import com.ifes.service.service.dto.ProductDropdownDTO;
import com.ifes.service.service.dto.ProductEditDTO;
import com.ifes.service.service.dto.ProductSaleDTO;
import com.ifes.service.service.dto.RelatorioRequestDTO;
import com.ifes.service.service.dto.RelatorioResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductResource {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductCreateDTO> create(@RequestBody ProductCreateDTO dto,
                                                   HttpServletResponse response) {
        ProductCreateDTO persisted = productService.save(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
                .buildAndExpand(persisted.getId()).toUri();
        response.setHeader("Location", uri.toASCIIString());
        return ResponseEntity.created(uri).body(persisted);
    }

    @PostMapping("/relatorio1")
    public ResponseEntity<List<RelatorioResponseDTO>> getRelatorioProdutos(@RequestBody RelatorioRequestDTO dto) {
        return ResponseEntity.ok(productService.getRelatorio1Result(dto));
    }

    @PutMapping
    public ResponseEntity<ProductEditDTO> update(@RequestBody ProductEditDTO dto) {
        return ResponseEntity.ok(productService.update(dto));
    }

    @GetMapping("/entrada/{id}")
    public ResponseEntity<ProductEditDTO> registerEntry(
            @PathVariable Long id,
            @RequestParam(name = "amount") double amount
    ) {
        return ResponseEntity.ok(productService.registerEntry(id,amount));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<ProductEditDTO>> getAll() {
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductEditDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getById(id));
    }

    @GetMapping("/bar-code")
    public ResponseEntity<ProductEditDTO> getByBarCode(@RequestParam(name = "barCode") String barCode) {
        return ResponseEntity.ok(productService.getByBarCode(barCode));
    }

    @GetMapping("/bar-code/terminal/{barcode}")
    public String getByBarCodeForTerminal(@PathVariable("barcode") String barCode) {
        return productService.getByBarCodeFromMicroterminal(barCode);
    }

    @GetMapping("/rfid")
    public ResponseEntity<ProductEditDTO> getByRfid(@RequestParam(name = "rfid") String rfid) {
        return ResponseEntity.ok(productService.getByRfid(rfid));
    }

    @GetMapping("/rfid/sale")
    public ResponseEntity<ProductSaleDTO> getByRfidForSale(@RequestParam(name = "rfid") String rfid) {
        return ResponseEntity.ok(productService.getByRfidForSale(rfid));
    }

    @GetMapping("/bar-code/sale")
    public ResponseEntity<ProductSaleDTO> getByBarCodeForSale(@RequestParam(name = "barCode") String barCode) {
        return ResponseEntity.ok(productService.getByBarCodeForSale(barCode));
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<ProductDropdownDTO>> getAllProductDropdown(){
        return ResponseEntity.ok(productService.getAllProductDropDown());
    }

    @GetMapping("/cafeteria")
    public ResponseEntity<List<ProductSaleDTO>> findAllIsCoffe() {
        return ResponseEntity.ok(productService.findAllByIsCoffe());
    }
}
