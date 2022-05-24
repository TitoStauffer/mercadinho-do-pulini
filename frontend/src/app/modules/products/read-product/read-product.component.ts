import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {PageNotificationService} from "@nuvem/primeng-components";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-read-product',
  templateUrl: './read-product.component.html'
})
export class ReadProductComponent implements OnInit {

    form: FormGroup;
    @Output('fechar') fechar = new EventEmitter();

    constructor(
        private productService: ProductService,
        private pageNotification: PageNotificationService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.buildReactiveForm();
    }

    buildReactiveForm() {
        return this.formBuilder.group({
            barCode: [null, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
            amount: [null],
            weight: [null]
        });
    }

    searchProduct() {
        if(!this.validateForm()) {
            this.pageNotification.addErrorMessage('Campos preenchidos incorretamente. Preencha o código de barras e infome a medida');
            return;
        }

        this.productService.findByBarCodeForSale(this.form.controls['barCode'].value).subscribe(
            produto => {
                if(!produto) {
                    this.pageNotification.addErrorMessage('Não foi possível localizar o produto');
                    return;
                }
                this.pageNotification.addSuccessMessage('Produto localizado com sucesso!');
                this.fechar.emit(this.setMeasureProduct(produto));
            }
        );

    }

    setMeasureProduct(product: any) {
        product.weight = this.form.controls['weight'].value;
        product.amount = this.form.controls['amount'].value;
        if(product.amount) {
            product.totalPrice = product.price * product.amount;
            return product;
        }
        product.totalPrice = product.price * product.weight;
        return product;
    }

    validateForm() {
        return this.form.valid && (this.form.controls['amount'].value || this.form.controls['weight'].value);
    }

    disableMeasure(){
        if(this.form.controls['weight'].value) {
            this.disableAndEnableFields('amount', 'weight');
            return
        }
        if(this.form.controls['amount'].value) {
            this.disableAndEnableFields('weight', 'amount');
            return
        }
        this.form.controls['amount'].enable();
        this.form.controls['weight'].enable();
    }

    disableAndEnableFields(disableField: string, enableField: string) {
        this.form.controls[disableField].disable();
        this.form.controls[enableField].enable();
    }

}
