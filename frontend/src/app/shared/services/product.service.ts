import { Injectable } from '@angular/core';
import {ProdutoVendaModel} from "../../models/produto-venda.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    listProducts: ProdutoVendaModel[] = [
        {
            id: 1,
            description: 'Arroz Bela Dica',
            price: 18.25,
            barCode: '1111111111111',
        },
        {
            id: 2,
            description: 'Carne Bovina - Patinho',
            price: 35.75,
            barCode: '2222222222222'
        },
        {
            id: 3,
            description: 'Feijão Carioca',
            price: 7.99,
            barCode: '3333333333333'
        },
        {
            id: 4,
            description: 'Cerveja Budweiser cx/6',
            price: 24.00,
            barCode: '4444444444444'
        },
        {
            id: 5,
            description: 'Queijo Minas',
            price: 23.45,
            barCode: '5555555555555'
        },
    ];

    constructor() { }

    findByBarCode(barCode: string) {
        return this.listProducts.find(product => product.barCode === barCode);
    }
}
