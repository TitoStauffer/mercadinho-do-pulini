import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../admin/models/userModel';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private resourceUrl = 'api/users';

    constructor(private http: HttpClient) { }

    login(cpf: string ){
        return this.http.post<UserModel>(this.resourceUrl + '/login', cpf);
    }

    insert(entity: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>(this.resourceUrl, entity);
    }

    findById(id: number): Observable<UserModel> {
        return this.http.get<UserModel>(this.resourceUrl + '/' + id);
    }

    findByCPF(cpf: string): Observable<UserModel> {
        return this.http.get<UserModel>(this.resourceUrl + '/cpf/' + cpf);
    }

    findAll(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(this.resourceUrl);
    }

    update(entity: UserModel): Observable<UserModel> {
        return this.http.put<UserModel>(this.resourceUrl, entity);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.resourceUrl + '/' + id);
    }


}
