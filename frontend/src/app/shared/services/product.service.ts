import {Injectable} from '@angular/core';
import {ProdutoVendaModel} from '../../models/produto-venda.model';
import {ProductModel} from '../../models/product.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

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

    baseUrl = environment.apiUrl + 'product';

    constructor(private http: HttpClient) {
    }

    create(product: ProductModel): Observable<ProductModel> {
        return this.http.post<ProductModel>(this.baseUrl, product);
    }

    update(product: ProductModel): Observable<ProductModel> {
        return this.http.put<ProductModel>(this.baseUrl, product);
    }

    delete(id: number): Observable<ProductModel> {
        return this.http.delete<ProductModel>(`${this.baseUrl}/${id}`);
    }

    read(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.baseUrl);
    }

    readById(id: number): Observable<ProductModel> {
        return this.http.get<ProductModel>(`${this.baseUrl}/${id}`);
    }

    findByBarCode(barCode: string): Observable<ProductModel> {
        return this.http.get<ProductModel>(`${this.baseUrl}/bar-code?barCode=${barCode}`);
    }

    findByBarCodeMock(barCode: string) {
        return this.listProducts.find(produto => produto.barCode === barCode);
    }

    findByRfid(rfid: string): Observable<ProductModel> {
        return this.http.get<ProductModel>(`${this.baseUrl}/rfid?rfid=${rfid}`);
    }
}
