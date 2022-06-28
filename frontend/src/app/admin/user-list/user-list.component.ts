import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserModel} from "../models/userModel";
import {PageNotificationService} from "@nuvem/primeng-components";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {

    cols = [
        {header: 'Nome', field: 'name'},
        {header: 'CPF', field: 'cpf'},
    ];

    @Input() totalValue: number;
    @Input() itens: UserModel[] = [];

    constructor(private userService: UserService,
                private notification: PageNotificationService,
                private router: Router) { }

    ngOnInit(): void {
        this.findAll();
    }

    findAll() {
        this.userService.findAll()
            .subscribe(
            users =>
                    this.itens = users,
            error => {
                    this.notification.addErrorMessage(error.error.message)
                }
            );
    }

    delete(user: UserModel) {
        this.userService.delete(user.id)
            .subscribe(
            () => {
                    this.findAll();
                    this.notification.addSuccessMessage("Usuário deletado com sucesso");
                    },
            error => {
                    this.notification.addErrorMessage(error.error.message)
                });
    }

    redirectToForm() {
        this.router.navigate(['admin/user/save']);
    }

}
