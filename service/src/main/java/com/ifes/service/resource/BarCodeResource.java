package com.ifes.service.resource;

import com.ifes.service.service.BarCodeService;
import com.lowagie.text.Element;
import com.lowagie.text.Image;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/barcodes")
@Slf4j
public class BarCodeResource {

    private final BarCodeService barCodeService;

    /*@GetMapping("/{barCode}")
    public ResponseEntity<byte[]> printBarCode(@PathVariable("barCode") String barCode){
        log.debug("Caiu aqui com seguinte código: {}", barCode);
        var barcodeImage = this.barCodeService.generateBarCodeImage(barCode);
        return new ResponseEntity<>(barcodeImage, HttpStatus.OK);
    }*/

    @GetMapping("/{barCode}")
    public Element printBarCode(@PathVariable("barCode") String barCode){
        return this.barCodeService.generateBarCodeImage(barCode);
    }

}
