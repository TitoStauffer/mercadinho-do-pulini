import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductModel} from '../../../models/product.model';
import {Router} from '@angular/router';
import {WeighingScaleService} from "../../../shared/services/weighing-scale.service";

@Component({
    selector: 'app-product-entry',
    templateUrl: './product-entry.component.html',
    styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {

    weighingScale: string;
    addAmount: number = 0;
    barCode: string;

    cols = [
        // {header: 'Id', field: 'id'},
        {header: 'Descrição', field: 'description'},
        {header: 'Preço de Compra', field: 'purchasePrice'},
        {header: 'Preço de Venda', field: 'salePrice'},
        {header: 'Imagem', field: 'image'}
    ];
    products: ProductModel[] = [];
    statuses: any;

    constructor(private productService: ProductService,
                private router: Router,
                private weighingScaleService: WeighingScaleService) {

    }

    ngOnInit(): void {
    }

    findByBarCode(): void {
        this.productService.findByBarCode(this.barCode).subscribe(
            product => {
                this.products[0] = product;
                this.barCode = '';
                // if (product.inventoryWeight != null) this.getWeight();
            },
            () => alert('Produto não encontrado')
        );
    }

    handleSubmitForm(): void {
        this.productService.registerEntry(this.products[0].id, this.addAmount).subscribe(
            () => {
                alert('Produtos registrados com sucesso!');
                this.router.navigateByUrl('admin/produtos');
            },
            () => alert('Erro ao criar produto!')
        );
    }

    saveWeighingScaleIP(): void {
        localStorage.setItem('WeighingScaleIP', this.weighingScale);
    }

    getWeight() {
        this.weighingScaleService.getWeightWeighingScale().subscribe(
            weight => {
                this.addAmount = weight;
            }
        );
    }
}
