import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductModel} from '../../../models/product.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-product-entry',
    templateUrl: './product-entry.component.html',
    styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {


    cols = [
        // {header: 'Id', field: 'id'},
        {header: 'Descrição', field: 'description'},
        {header: 'Preço de Compra', field: 'purchasePrice'},
        {header: 'Preço de Venda', field: 'salePrice'},
        {header: 'Imagem', field: 'image'}
    ];

    productEntryForm: FormGroup;
    products: ProductModel[] = [];
    statuses: any;

    constructor(private productService: ProductService,
                private router: Router) {
        this.productEntryForm = new FormGroup({
            barCode: new FormControl(''),
            addAmount: new FormControl(''),
            weight: new FormControl(true)
        });
    }

    ngOnInit(): void {
    }

    findByBarCode(): void {
        this.productService.findByBarCode(this.productEntryForm.value.barCode).subscribe(
            product => {
                this.products[0] = product;
            },
            () => alert('Produto não encontrado')
        );
    }

    handleSubmitForm(): void {
        this.productService.registerEntry(this.products[0].id, this.productEntryForm.value.addAmount).subscribe(
            () => {
                alert('Produtos registrados com sucesso!');
                this.router.navigateByUrl('admin/produtos');
            },
            () => alert('Erro ao criar produto!')
        );
    }
}
