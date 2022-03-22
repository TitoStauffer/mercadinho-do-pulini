import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {ProductModel} from '../../../models/product.model';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    cols = [
        {header: 'Descrição', field: 'description'},
        {header: 'Preço de Compra', field: 'purchasePrice'},
        {header: 'Preço de Venda', field: 'salePrice'},
        {header: 'Quantidade', field: 'inventoryAmount'},
        {header: 'Peso', field: 'inventoryWeight'}
    ];

    products: ProductModel[];

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.productService.read().subscribe(products => {
            this.products = products;
        });
    }
}
