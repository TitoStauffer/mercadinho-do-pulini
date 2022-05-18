import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProdutoVendaModel} from "../../../models/produto-venda.model";

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

    form: FormGroup;
    @Input() product: ProdutoVendaModel;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.form = this.buildReactiveForms();
        this.form.disable();
    }

    buildReactiveForms() {
        return this.formBuilder.group({
            barCode: [null],
            description: [null],
            price: [null],
            totalPrice: [null]
        });
    }

    onLoadEntity(product: ProdutoVendaModel) {
        this.form.patchValue(product);
    }

    getImage() {
        return this.product.image;
    }

}
