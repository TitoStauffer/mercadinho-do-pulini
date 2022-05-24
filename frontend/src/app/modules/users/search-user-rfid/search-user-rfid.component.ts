import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PageNotificationService} from "@nuvem/primeng-components";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/user.model";

@Component({
    selector: 'app-search-user-rfid',
    templateUrl: './search-user-rfid.component.html',
    styleUrls: ['./search-user-rfid.component.css']
})
export class SearchUserRfidComponent implements OnInit {

    @Output() fechar = new EventEmitter();
    form: FormGroup;

    userFound: UserModel = null

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
            rfid: [null, [Validators.required]]
        })
    }

    search() {
        this.userService.findByRFID(this.form.value.rfid)
            .subscribe(user => this.userFound = user,
                () => this.pageNotification.addErrorMessage("Usuário não encontrado"));
    }

    finishCoffeeSale(){
        if(this.userFound != null){
            this.fechar.emit(this.userFound);
        }
    }

}
