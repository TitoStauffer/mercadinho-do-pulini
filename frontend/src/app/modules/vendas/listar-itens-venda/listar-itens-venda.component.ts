import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

    @Output() remove = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    removeItem(product: ProdutoVendaModel) {
        this.remove.emit(product)
    }

}
