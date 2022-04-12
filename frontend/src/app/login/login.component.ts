import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageNotificationService } from '@nuvem/primeng-components';
import { LoginService } from '../services/login.service';
import {WebAuthnService} from "../services/web-authn.service";
import {UserService} from "../services/user.service";
import {UserModel} from "../admin/models/userModel";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private userService: UserService,
        private webAuthnService: WebAuthnService,
        private router: Router,
        private notification: PageNotificationService
    ) { }

    iniciarForm(){
        this.form = this.fb.group({
            cpf: [null, [Validators.required]],
        })
    }

    ngOnInit(): void {
        this.iniciarForm();
    }

    login(){
        this.loginService.login(this.form.value.cpf).subscribe(
            user => this.saveStorageAndLogin(user),
                erro => {
            this.notification.addErrorMessage(erro.error.message);
            localStorage.clear();
        } );
    }

    saveStorageAndLogin(user: UserModel) {
        localStorage.setItem('token', user.cpf);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['../admin']);
    }

    webAuthSignin() {
        this.userService.findByCPF(this.form.controls.cpf.value).subscribe(user => {
            user.credentials = JSON.parse(user.fingerprint);
            this.webAuthnService.webAuthnSignin(user)
                .then((response) => {
                    this.notification.addSuccessMessage('✅ Bem-Vindo ' + user.name + '!');
                    this.saveStorageAndLogin(user);
                })
                .catch(() =>  this.notification.addErrorMessage('🚫 credenciais invalidas!'));
        });
    }

}
