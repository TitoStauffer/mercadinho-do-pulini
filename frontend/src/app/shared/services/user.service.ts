import { Injectable } from '@angular/core';
import {UserModel} from "../../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: UserModel[] = [

    ]

    constructor() { }

    findByCpf(cpf: string) {
        return this.users.find(user => user.cpf === cpf);
    }
}
