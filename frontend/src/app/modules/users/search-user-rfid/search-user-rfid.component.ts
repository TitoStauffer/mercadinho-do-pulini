import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PageNotificationService} from "@nuvem/primeng-components";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/user.model";
import {MessageService} from "primeng";

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
        private pageNotification: PageNotificationService,
        private messageService: MessageService
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
                (error) => {
                    this.messageService.add({severity: "error", summary: "Erro", detail: error.error.message});
                    this.fechar.emit();
                });
    }

    finishCoffeeSale(){
        if(this.userFound != null){
            this.fechar.emit(this.userFound);
        }
    }

}
