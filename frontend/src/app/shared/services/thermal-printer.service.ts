import {Injectable} from "@angular/core";
import {PrintService, UsbDriver} from "ng-thermal-print";
import {ProductModel} from "../../models/product.model";

@Injectable({
    providedIn: "root",
})
export class ThermalPrinterService {
    printerStatus: boolean = false;
    usbPrintDriver: UsbDriver = new UsbDriver();

    constructor(private printService: PrintService) {
        this.printService.isConnected.subscribe((result) => {
            this.printerStatus = result;
        });
    }

    getLocalStoragePrinterPersistence(): void {
        if (localStorage.getItem("printer-device")) {
            const device = JSON.parse(localStorage.getItem("printer-device"));
            this.usbPrintDriver = new UsbDriver(device.vendorId, device.productId);
            const language = device.vendorId === 1305 ? "StarPRNT" : "ESC/POS";
            this.printService.setDriver(this.usbPrintDriver, language);
        }
    }

    async requestUsb(): Promise<void> {
        if (this.printerStatus) {
            return;
        }
        await new Promise(async (resolve, reject) => {
            if (this.printerStatus) {
                resolve(true);
            }
            this.usbPrintDriver.requestUsb().subscribe(
                (result) => {
                    const language = result.vendorId === 1305 ? "StarPRNT" : "ESC/POS";
                    localStorage.setItem(
                        "printer-device",
                        JSON.stringify({
                            vendorId: result.vendorId,
                            productId: result.productId,
                        })
                    );
                    this.usbPrintDriver = new UsbDriver(
                        result.vendorId,
                        result.productId
                    );
                    this.printService.setDriver(this.usbPrintDriver, language);
                    resolve(result);
                },
                () => resolve(true)
            );
        });
    }

    initPrinter(): void {
        this.printService.init();
    }

    printProduct(product: ProductModel): void {
        if(!this.printerStatus) return;
        this.printService.init();
        this.printService
            .setBold(true)
            .writeLine("Produto")
            .setBold(false)
            .feed(1)
            .writeLine(`Descricao: ${product.description}`)
            .writeLine(`Codigo de barras: ${product.barCode}`)
            .writeLine(`Quantidade em estoque: ${product.inventoryAmount || product.inventoryWeight} ${product.inventoryWeight ? 'kg' : 'un'}`)
            .writeLine(`RFID: ${product.rfid}`)
            .feed(1)
            .cut('full')
            .flush()
        ;
    }
}
