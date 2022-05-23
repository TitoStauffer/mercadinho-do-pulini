import { Injectable } from '@angular/core';
import {VendaModel} from "../../models/venda.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class SaleService {

    resource = environment.apiUrl + "/sales";
    constructor(http: HttpClient) { }

    save(sale: VendaModel) {
        return new Observable();
    }
}
