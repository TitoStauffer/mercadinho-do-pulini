import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-product-entry',
    templateUrl: './product-entry.component.html',
    styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {

    productEntryForm: FormGroup;


    constructor(private productService: ProductService) {
        this.productEntryForm = new FormGroup({
            description: new FormControl(''),
            inventoryAmount: new FormControl(''),
            inventoryWeight: new FormControl(''),
            barCode: new FormControl(''),
            rfid: new FormControl(''),
            purchasePrice: new FormControl(''),
            salePrice: new FormControl(''),
            isCoffeeShop: new FormControl(),
            categoryId: new FormControl(''),
            image: new FormControl(''),
        });
    }

    ngOnInit(): void {
    }

    findByBarCode(): void {
        console.log('teste');
        // this.productService.findByBarCode('sd');
    }

    handleSubmitForm(): void {
        console.log('submit');
    }
}
