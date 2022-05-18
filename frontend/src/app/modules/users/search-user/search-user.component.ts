import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PageNotificationService} from "@nuvem/primeng-components";
import {UserService} from "../../../services/user.service";

@Component({
    selector: 'app-search-user',
    templateUrl: './search-user.component.html',
    styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

    @Output() fechar = new EventEmitter();
    form: FormGroup;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private pageNotification: PageNotificationService
    ) { }

    ngOnInit(): void {
        this.form = this.buildReactiveForm();
    }

    buildReactiveForm() {
        return this.formBuilder.group({
            cpf: [null, [Validators.minLength(11), Validators.maxLength(11)]]
        })
    }

    search() {
        this.userService.findByCPF(this.form.value.cpf)
            .subscribe(user => {
                this.pageNotification.addSuccessMessage('Usuário encontrado com sucesso');
                this.fechar.emit(user);
            },
            erro => {
                this.pageNotification.addErrorMessage(erro.title);
            });
    }

}
