import { Injectable } from '@angular/core';
import {VendaModel} from "../../models/venda.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SaleService {

    resource = environment.apiUrl + 'sale'

    constructor(private http: HttpClient) { }

    save(sale: VendaModel): Observable<any> {
        return this.http.post(this.resource, sale);
    }

    saveCoffe(sale: VendaModel): Observable<any> {
        return this.http.post(this.resource + '/cafeteria', sale);
    }
}
