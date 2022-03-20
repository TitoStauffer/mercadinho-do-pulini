import { Injectable } from '@angular/core';
import {UserModel} from "../../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: UserModel[] = [
        {
            id: 1,
            name: 'João Pedro Calixto',
            cpf: '12312312312'
        },
        {
            id: 2,
            name: 'Rayane Merlo',
            cpf: '12312312313'
        },
    ]

    constructor() { }

    findByCpf(cpf: string) {
        return this.users.find(user => user.cpf === cpf);
    }
}
