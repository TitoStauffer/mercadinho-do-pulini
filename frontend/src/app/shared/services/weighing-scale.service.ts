import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class WeighingScaleService {

    baseUrl = environment.balanceUrl;

    constructor(private http: HttpClient) {
    }

    getWeightWeighingScale(): Observable<number> {
        // return this.http.get<number>('http://' + localStorage.getItem('WeighingScaleIP') + ':80');
        return this.http.get<number>(this.baseUrl);
    }
}
