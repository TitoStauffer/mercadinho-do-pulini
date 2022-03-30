import { Component } from '@angular/core';
import { Authentication, User } from '@nuvem/angular-base';
import {AdminComponent} from "../../admin/admin.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

    constructor(public app: AdminComponent, private readonly _authentication: Authentication<User>,private router: Router) {
    }

    get usuario() {
        return this._authentication.getUser();
    }

    isAuthenticated() {
        return this._authentication.isAuthenticated();
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['../login']);
    }
}
