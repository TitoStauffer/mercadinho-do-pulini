import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageNotificationService } from '@nuvem/primeng-components';
import { LoginService } from '../services/login.service';

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
        this.loginService.login(this.form.value.cpf).subscribe( user => {
          localStorage.setItem('token', user.cpf);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['../admin']);
        }, erro => {
            this.notification.addErrorMessage(erro.error.message);
            localStorage.clear();
        } );
    }

}
