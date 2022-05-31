import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {ProductModel} from "../../models/product.model";

@Component({
    selector: 'app-relatorio2',
    templateUrl: './relatorio2.component.html',
})
export class Relatorio2Component implements OnInit {

    cols = [
        {header: 'Id', field: 'id'},
        {header: 'Nome', field: 'description'},
        {header: 'Valor Total', field: 'description'},
    ];

    dataInicio: Date = null;
    dateFim: Date = null;

    @Input() totalValue: number;
    @Input() itens: ProductModel[] = [];

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.findAll();
    }

    findAll() {
        this.productService.read().subscribe(users => this.itens = users);
    }

}
