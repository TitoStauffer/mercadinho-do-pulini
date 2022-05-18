import {Injectable} from '@angular/core';
import {ProdutoVendaModel} from '../../models/produto-venda.model';
import {ProductModel} from '../../models/product.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ProductListBarcode} from "../../models/product-list-barcode";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

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

    findByRfid(rfid: string): Observable<ProductModel> {
        return this.http.get<ProductModel>(`${this.baseUrl}/rfid?rfid=${rfid}`);
    }

    registerEntry(id: number, amount: number): Observable<ProductModel> {
        return this.http.get<ProductModel>(`${this.baseUrl}/entrada/${id}?amount=${amount}`);
    }

    getAllSelect(): Observable<ProductListBarcode[]> {
        return this.http.get<ProductListBarcode[]>(`${this.baseUrl}/dropdown`);
    }

    findAllByCoffee(): Observable<ProdutoVendaModel[]> {
        return this.http.get<ProdutoVendaModel[]>(this.baseUrl + '/cafeteria');
    }
}
