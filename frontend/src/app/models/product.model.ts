export class ProductModel {
    id: number;
    description: string;
    inventoryAmount?: number;
    inventoryWeight?: number;
    barCode: string;
    rfid: string;
    purchasePrice: number;
    salePrice: number;
    isCoffeeShop: boolean;
    categoryId: number;
    image?: string;
}
