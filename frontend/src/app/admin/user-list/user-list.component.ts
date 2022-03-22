import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserModel} from "../models/userModel";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {

    cols = [
        {header: 'Id', field: 'id'},
        {header: 'Name', field: 'name'},
        {header: 'Cpf', field: 'cpf'},
        {header: 'Fingerprint', field: 'fingerprint'},
    ];

    @Input() totalValue: number;
    @Input() itens: UserModel[] = [];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.findAll();
    }

    findAll() {
        this.userService.findAll().subscribe(users => this.itens = users);
    }

    delete(user: UserModel) {
        this.userService.delete(user.id)
            .subscribe(() => this.findAll());
    }

}
