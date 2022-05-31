import {Injectable} from '@angular/core';
import {VendaModel} from "../../models/venda.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ProdutoVendaModel} from "../../models/produto-venda.model";

@Injectable({
    providedIn: 'root'
})
export class SaleService {

    resource = environment.apiUrl + 'sale'

    constructor(private http: HttpClient) {
    }

    save(sale: VendaModel): Observable<any> {
        return this.http.post(this.resource, sale);
    }

    saveCoffee(sale: VendaModel): Observable<any> {
        return this.http.post(this.resource + '/cafeteria', sale);
    }

    cancelSale(sale): Observable<any> {
        return this.http.post(this.http + '/cancelar', sale);
    }

    getOpensByUserId(id: number): Observable<ProdutoVendaModel[]> {
        return this.http.get<ProdutoVendaModel[]>(this.resource + '/aberta/' + id);
    }
}
