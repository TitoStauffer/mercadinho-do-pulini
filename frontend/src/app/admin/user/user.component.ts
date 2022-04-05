import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { PageNotificationService } from '@nuvem/primeng-components';
import {UserService} from "../../services/user.service";
import {PerfilEnum} from "../../shared/Utils/PerfilEnum";
import {SelectItem} from "primeng";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

    form: FormGroup;
    submit = false;
    perfils: SelectItem[] = [
        {label: PerfilEnum.Admin, value: PerfilEnum.Admin },
        {label: PerfilEnum.Cliente, value: PerfilEnum.Cliente },
        {label: PerfilEnum.Caixa, value: PerfilEnum.Caixa },
        {label: PerfilEnum.Cafeteria, value: PerfilEnum.Cafeteria },
        {label: PerfilEnum.Estoque, value: PerfilEnum.Estoque },
        {label: PerfilEnum.Recepcao, value: PerfilEnum.Recepcao },
    ];

    constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: PageNotificationService,
    private userService: UserService,
    private route: ActivatedRoute
    ) { }

    iniciarForm() {
    this.form = this.fb.group({
        id: [null],
        cpf: [null, [Validators.required]],
        name: [null, [Validators.required]],
        profile: [null, [Validators.required]],
    })
    }

    ngOnInit(): void {
        this.iniciarForm();
        this.getUserIfIsEdit();
    }

    getUserIfIsEdit() {
        this.route
            .queryParams
            .subscribe(params => {
                if (params['id']) {
                    this.userService.findById(params['id'])
                        .subscribe(user => this.form.patchValue(user))
                }
            });
    }

    save() {
        if (this.form.value.id) {
            this.userService.update(this.form.value)
                .subscribe(user => this.goBack());
            return
        }
        this.userService.insert(this.form.value)
            .subscribe(user => this.goBack());
    }

    goBack() {
        this.router.navigate(['/admin/user']);
    }

}
