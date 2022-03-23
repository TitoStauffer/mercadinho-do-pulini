import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {PageNotificationService} from "@nuvem/primeng-components";

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
        const user = this.userService.findByCpf(this.form.value.cpf);

        if(!user) {
            this.pageNotification.addErrorMessage('Usuário não foi localizado no sistema');
            return;
        }

        this.pageNotification.addSuccessMessage('Usuário encontrado com sucesso');
        this.fechar.emit(user);
    }

}
