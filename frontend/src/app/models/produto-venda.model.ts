export class ProdutoVendaModel {
    id: number;
    description: string;
    price: number;
    amount?: number;
    weight?: number;
    barCode: string;
    image?: string;
    totalPrice?: number;
    saleId: number;
}
