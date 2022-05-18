import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ReadProductComponent} from './read-product/read-product.component';
import {ReadProductModalComponent} from './read-product/read-product-modal.component';
import {SharedModule} from '../../shared/shared.module';
import {DetailsProductComponent} from './details-product/details-product.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductFormComponent} from './product-form/product-form.component';
import {ProductEntryComponent} from './product-entry/product-entry.component';
import {InputNumberModule} from 'primeng';
import {ReactiveFormsModule} from '@angular/forms';
import {ThermalPrintModule} from "ng-thermal-print";

@NgModule({
    declarations: [
        ReadProductComponent,
        ReadProductModalComponent,
        DetailsProductComponent,
        ProductListComponent,
        ProductFormComponent,
        ProductEntryComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        InputNumberModule,
        ThermalPrintModule
    ],
    entryComponents: [
        ReadProductModalComponent
    ],
    exports: [
        ReadProductComponent,
        ReadProductModalComponent,
        DetailsProductComponent
    ]
})
export class ProductsModule {
}
