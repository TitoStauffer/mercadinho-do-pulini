import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {ProductModel} from '../../../models/product.model';
import {Router} from '@angular/router';

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

    constructor(private productService: ProductService, private router: Router) {
    }

    ngOnInit(): void {
        this.productService.read().subscribe(products => {
            this.products = products;
        });
    }

    handleClick(): void {
        this.router.navigateByUrl('produtos/novo');
    }
}
