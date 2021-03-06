import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from "./product.service";
import {SaleService} from "./sale.service";
import {DialogService} from "primeng";
import {WeighingScaleService} from "./weighing-scale.service";



@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        ProductService,
        SaleService,
        DialogService,
        WeighingScaleService
    ]
})
export class ServicesModule { }
