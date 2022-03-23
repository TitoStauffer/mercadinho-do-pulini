import { Injectable } from '@angular/core';
import {VendaModel} from "../../models/venda.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SaleService {

    constructor() { }

    save(sale: VendaModel) {
        return new Observable();
    }
}
