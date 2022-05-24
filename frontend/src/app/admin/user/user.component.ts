import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { PageNotificationService } from '@nuvem/primeng-components';
import {UserService} from "../../services/user.service";
import {PerfilEnum} from "../../shared/utils/PerfilEnum";
import {SelectItem} from "primeng";
import {WebAuthnService} from "../../services/web-authn.service";
import * as CBOR from '../../shared/utils/cbor.js';

export interface DecodedAttestionObj {
    attStmt: {
        alg: number;
        sig: Uint8Array;
    };
    authData: Uint8Array;
    fmt: string;
}

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
        {label: PerfilEnum.Estoque, value: PerfilEnum.Estoque },
        {label: PerfilEnum.Recepcao, value: PerfilEnum.Recepcao },
    ];

    constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: PageNotificationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private webAuthnService: WebAuthnService,
    ) { }

    iniciarForm() {
        this.form = this.fb.group({
            id: [null],
            cpf: [null, [Validators.required]],
            name: [null, [Validators.required]],
            profile: [null, [Validators.required]],
            fingerprint: [null]
        },{updateOn:"change"})
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
            this.userService.update(this.form.value).subscribe(() => this.goBack());
            return
        }
        this.userService.insert(this.form.value)
            .subscribe(() => this.goBack());
    }

    salvarBiometria() {
        this.webAuthnService.webAuthnSignup(this.form.value)
            .then((credential: PublicKeyCredential) => {
                this.registerCredential(credential);
                this.save();
                console.log('credentials.create RESPONSE', credential);
            }).catch((error) => {
            console.log('credentials.create ERROR', error);
        });
    }

    registerCredential(credential: PublicKeyCredential) {
        const authData = this.extractAuthData(credential);
        const credentialIdLength = this.getCredentialIdLength(authData);
        const credentialId: Uint8Array = authData.slice(55, 55 + credentialIdLength);
        const publicKeyBytes: Uint8Array = authData.slice(55 + credentialIdLength);
        const userCredential = [{credentialId, publicKey: publicKeyBytes}];
        this.form.patchValue({...this.form.value, fingerprint: JSON.stringify(userCredential) });
    }

    extractAuthData(credential: PublicKeyCredential): Uint8Array {
        const decodedAttestationObj: DecodedAttestionObj = CBOR.decode((credential.response as any).attestationObject);
        const { authData } = decodedAttestationObj;
        return authData;
    }

    getCredentialIdLength(authData: Uint8Array): number {
        const dataView = new DataView(new ArrayBuffer(2));
        const idLenBytes = authData.slice(53, 55);
        idLenBytes.forEach((value, index) => dataView.setUint8(index, value));
        return dataView.getUint16(0);
    }

    goBack() {
        this.router.navigate(['/admin/user']);
    }

}
