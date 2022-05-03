import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {ProductModel} from '../../../models/product.model';
import {Router} from '@angular/router';
import {ThermalPrinterService} from "../../../shared/services/thermal-printer.service";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    cols = [
        // {header: 'Id', field: 'id'},
        {header: 'Descrição', field: 'description'},
        {header: 'Preço de Compra', field: 'purchasePrice'},
        {header: 'Preço de Venda', field: 'salePrice'},
        {header: 'Código de barras', field: 'barCode'},
        {header: 'Imagem', field: 'image'}
    ];

    products: ProductModel[] = [];

    constructor(
        private productService: ProductService,
        private router: Router,
        private printService: ThermalPrinterService
    ) {
        this.printService.getLocalStoragePrinterPersistence();
    }

    ngOnInit(): void {
        this.productService.read().subscribe(products => {
            this.products = products;
        });
    }

    handleClick(): void {
        this.router.navigateByUrl('admin/produtos/novo');
    }

    delete(id: number): void {
        this.productService.delete(id).subscribe(
            () => {
                alert('Producto excluido com sucesso!');
                window.location.reload();
            },
            () => alert('Erro ao excluir produto!')
        );
    }

    edit(id: number): void {
        this.router.navigateByUrl(`admin/produtos/editar/${id}`);
    }

    connectPrinter(): void {
        this.printService.requestUsb().then(r => console.log("Conectado"));
    }

    testePrint(product: ProductModel): void {
        this.printService.printProduct(product);
    }
}
