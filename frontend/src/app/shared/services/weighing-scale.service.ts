import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WeighingScaleService {

    constructor(private http: HttpClient) {
    }

    getWeightWeighingScale(): Observable<number> {
        return this.http.get<number>('http://' + localStorage.getItem('WeighingScaleIP') + ':80');
    }
}
