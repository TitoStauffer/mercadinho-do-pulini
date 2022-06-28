import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PageNotificationService} from "@nuvem/primeng-components";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../admin/models/userModel";
import {SaleService} from "../../../shared/services/sale.service";

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
        private saleService: SaleService,
        private formBuilder: FormBuilder,
        private pageNotification: PageNotificationService
    ) {
    }

    ngOnInit(): void {
        this.form = this.buildReactiveForm();
    }

    buildReactiveForm() {
        return this.formBuilder.group({
            cpf: [null, [Validators.minLength(11), Validators.maxLength(11)]]
        })
    }

    loadSale(user: UserModel) {
        this.saleService.getOpensByUserId(user.id)
            .subscribe(products => {
                    this.pageNotification.addSuccessMessage('Produtos carregados com sucesso!');
                    this.fechar.emit({user, products});
                },
                erro => {
                    this.pageNotification.addErrorMessage('Produtos não encontrado');
                    this.fechar.emit();
                });
    }

    search() {
        this.userService.findByRFID(this.form.value.cpf)
            .subscribe(user => {
                    this.pageNotification.addSuccessMessage('Usuário encontrado com sucesso');
                    this.loadSale(user);
                },
                () => {
                    this.pageNotification.addErrorMessage('Usuário não encontrado');
                    this.fechar.emit();
                });
    }

}
