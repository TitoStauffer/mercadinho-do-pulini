package com.ifes.service.service;

import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.pdf.BarcodeEAN;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.*;
import java.io.FileOutputStream;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BarCodeService {

    @SneakyThrows
    public Element generateBarCodeImage(String barCodeNumber)  {
        var doc = new Document();
        doc.open();
        var pdf = PdfWriter.getInstance(doc, new FileOutputStream("codigo.pdf"));
        pdf.open();
        log.info("starting the barcode generate with this number {}", barCodeNumber);
        BarcodeEAN barcodeEAN = new BarcodeEAN();
        barcodeEAN.setCode(barCodeNumber);
        Element barcoder = barcodeEAN.createImageWithBarcode(pdf.getDirectContent(), Color.black, Color.BLACK);
        doc.add(barcoder);
        doc.close();
        return barcoder;



//        try{
//            File file = ResourceUtils.getFile("classpath:report/barcode.jrxml");
//            var design = file.getAbsolutePath();
//            var report = JasperCompileManager.compileReport(design);
//            var data = new JRBeanCollectionDataSource(List.of(barCodeNumber));
//            var param = new HashMap<>();
//            var print = JasperFillManager.fillReport(report, null, data);
//            var result = JasperExportManager.exportReportToHtmlFile(print, "");
//        } catch (FileNotFoundException | JRException ex){
//            System.err.println(ex.getMessage());
//        }

    }

}
