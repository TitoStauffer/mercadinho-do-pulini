import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ReadProductComponent } from './read-product/read-product.component';
import {ReadProductModalComponent} from "./read-product/read-product-modal.component";
import {SharedModule} from "../../shared/shared.module";
import { DetailsProductComponent } from './details-product/details-product.component';

@NgModule({
    declarations: [
        ReadProductComponent,
        ReadProductModalComponent,
        DetailsProductComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        SharedModule
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
export class ProductsModule { }
