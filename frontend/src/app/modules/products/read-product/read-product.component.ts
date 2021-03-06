import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {PageNotificationService} from "@nuvem/primeng-components";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WeighingScaleService} from "../../../shared/services/weighing-scale.service";

@Component({
    selector: 'app-read-product',
    templateUrl: './read-product.component.html'
})
export class ReadProductComponent implements OnInit {

    form: FormGroup;
    @Output('fechar') fechar = new EventEmitter();
    searchRefi = false;

    constructor(
        private productService: ProductService,
        private weighingScaleService: WeighingScaleService,
        private pageNotification: PageNotificationService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.buildReactiveForm();
    }

    buildReactiveForm() {
        return this.formBuilder.group({
            barCode: [null, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
            amount: [1],
            weight: [null]
        });
    }

    searchProduct() {
        if (!this.validateForm()) {
            this.pageNotification.addErrorMessage('Campos preenchidos incorretamente. Preencha o código de barras e infome a medida');
            return;
        }

        this.productService.findByBarCodeForSale(this.form.controls['barCode'].value).subscribe(
            produto => {
                if (!produto) {
                    this.pageNotification.addErrorMessage('Não foi possível localizar o produto');
                    return;
                }
                this.setMeasureProduct(produto);
            }
        );

    }

    async searchRFID() {
        this.searchRefi = !this.searchRefi;
        while (this.searchRefi) {
            await new Promise(f => setTimeout(f, 1000));
            this.productService.findByRfid2().subscribe( rfid => {
                if (rfid) {
                    this.productService.findByRfid(rfid).subscribe(
                        produto => {
                            if (!produto) {
                                this.pageNotification.addErrorMessage('Não foi possível localizar o produto');
                                return;
                            }
                            this.setMeasureProduct(produto);
                        }
                    );
                }
            }, () => {})
        }
    }

    sendProduct(product) {
        this.form.reset();
        this.fechar.emit(product);
    }

    setMeasureProduct(product: any) {
        if(product.weight) {
            this.getWeight(product);
            return;
        }
        product.amount = this.form.controls['amount'].value || 1;
        product.totalPrice = product.price * product.amount;
        this.pageNotification.addSuccessMessage('Produto localizado com sucesso!');
        this.sendProduct(product);
    }

    validateForm() {
        return this.form.valid;
    }

    disableMeasure() {
        if (this.form.controls['weight'].value) {
            this.disableAndEnableFields('amount', 'weight');
            return
        }
        if (this.form.controls['amount'].value) {
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

    enterEvent(event) {
        if(event === 'Enter') {
            this.searchProduct();
        }
    }

    getWeight(product: any) {
        this.weighingScaleService.getWeightWeighingScale().subscribe(
            weight => {
                product.totalPrice = product.price * weight;
                product.weight = weight;
                this.sendProduct(product);
                this.pageNotification.addSuccessMessage('Produto localizado com sucesso!');
            }, error => this.pageNotification.addErrorMessage("Impossível fazer comunicação com a balança!")
        );
    }
}
