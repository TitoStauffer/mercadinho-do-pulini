import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {Relatorio1Model} from "../../models/relatorio1.model";

@Component({
    selector: 'app-relatorio1',
    templateUrl: './relatorio1.component.html',
})
export class Relatorio1Component {

    cols = [
        {header: 'Nome', field: 'description'},
        {header: 'Valor Total', field: 'totalValue'},
        {header: 'Quantidade', field: 'quantidade'},
    ];

    dataInicio: Date = null;
    dateFim: Date = null;

    @Input() totalValue: number;
    @Input() itens: Relatorio1Model[] = [];

    constructor(private productService: ProductService) { }

    findAll() {
        this.productService.relatorio1({dataInicio: this.dataInicio, dataFim: this.dateFim}).subscribe(users => this.itens = users);
    }

}
