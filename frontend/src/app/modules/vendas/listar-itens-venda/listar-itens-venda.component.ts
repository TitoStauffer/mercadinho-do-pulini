import {Component, Input, OnInit} from '@angular/core';
import {Column} from "@nuvem/primeng-components";
import {ProdutoVendaModel} from "../../../models/produto-venda.model";

@Component({
    selector: 'app-listar-itens-venda',
    templateUrl: './listar-itens-venda.component.html',
    styleUrls: ['./listar-itens-venda.component.css']
})
export class ListarItensVendaComponent implements OnInit {

    cols = [
        {header: 'Código', field: 'id'},
        {header: 'Descrição', field: 'description'},
        {header: 'Preço', field: 'price'},
        {header: 'Quantidade', field: 'amount'},
        {header: 'Peso', field: 'weight'},
        {header: 'Valor total', field: 'totalPrice'}
    ];
    @Input() totalValue: number;

    @Input() itens: ProdutoVendaModel[] = [];

    constructor() { }

    ngOnInit(): void {
    }

}
