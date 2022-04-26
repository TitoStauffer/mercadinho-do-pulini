import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../admin/models/userModel';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BarCodeService {

    private resourceUrl = 'api/barcodes';

    constructor(private http: HttpClient) { }



    print(barcode: string ){
        const headers= new HttpHeaders()
            .set('content-type', 'arraybuffer');
        return this.http.get(`${this.resourceUrl}/${barcode}`,
            {headers: headers, responseType: 'arraybuffer'});
    }



}
