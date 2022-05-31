import {ProdutoVendaModel} from "./produto-venda.model";

export class VendaModel {
    id: number;
    userId: number;
    products: ProdutoVendaModel[];
    otherUserIds: number[] = [];
}
