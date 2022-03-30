import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
    @Output() itemRemovido = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    removerItem(prod) {
        const index = this.itens.findIndex(produto => produto.id === prod.id);
        if(index !== -1) {
            this.itens.splice(index, 1);
        }
        this.itemRemovido.emit();
    }

}
