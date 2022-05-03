import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from "./product.service";
import {SaleService} from "./sale.service";
import {DialogService} from "primeng";
import {UserService} from "./user.service";
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
        UserService,
        WeighingScaleService
    ]
})
export class ServicesModule { }
