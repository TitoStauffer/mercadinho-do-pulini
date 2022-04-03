export class ProdutoVendaModel {
    id: number;
    description: string;
    price: number;
    amount?: number;
    weight?: number;
    barCode: string;
    rfid: string;
    image?: string;
    totalPrice?: number;
}
